import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const inputRadioState = event.target.elements.state.value;
  const userDelay = Number(event.target.elements.delay.value.trim());

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputRadioState === 'fulfilled') {
        return resolve(`✅ Fulfilled promise in ${userDelay}ms`);
      } else {
        return reject(`❌ Rejected promise in ${userDelay}ms`);
      }
    }, userDelay);
  })
    .then(message => {
      iziToast.success({
        message: message,
        position: 'topRight',
        progressBar: false,
        messageColor: 'white',
        icon: false,
        close: false,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
        progressBar: false,
        messageColor: 'white',
        icon: false,
        close: false,
      });
    })
    .finally(() => {
      form.reset();
    });
}
