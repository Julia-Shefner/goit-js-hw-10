import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = Date.now();
    if (selectedDate <= dateNow){
        iziToast.warning({
    title: 'Caution',
    message: 'You forgot important data',
});
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  },
}; 
const startBtn = document.querySelector('button[data-start]');
console.log(startBtn);

flatpickr(input, options);

let userSelectedDate = selectedDate;
