import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const input = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    userSelectedDate = selectedDate;
    const dateNow = Date.now();
    if (selectedDate <= dateNow) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        close: false,
        timeout: 2000,
        color: '#ff4e4e',
        messageColor: 'white',
        progressBar: false,
        overlay: false,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const startBtn = document.querySelector('button[data-start]');
const timerDay = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

flatpickr(input, options);
class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.isActive = false;
    this.intervalId = null;
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
        this.onTick(this.convertMs(0));
        input.disabled = false;
        startBtn.disabled = false;
      }
    }, 1000);
    startBtn.disabled = true;
    input.disabled = true;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClock,
});

startBtn.addEventListener('click', timer.start.bind(timer));

function updateClock({ days, hours, minutes, seconds }) {
  timerDay.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
  timerSeconds.textContent = `${seconds}`;
}
