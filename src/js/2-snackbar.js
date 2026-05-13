import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseGenerator = (delay, option) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (option === 'fulfilled') {
        res(delay);
        return;
      }
      rej(delay);
    }, delay);
  });
};

const refs = {
  'promise-form': document.querySelector('.js-form'),
};

refs['promise-form'].addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(refs['promise-form'].elements.delay.value);
  const option = refs['promise-form'].elements.state.value;

  promiseGenerator(delay, option)
    .then(result => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${result}ms`,
        icon: '',
        position: 'topRight',
      });
    })
    .catch(result => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${result}ms`,
        icon: '',
        position: 'topRight',
      });
    });

  refs['promise-form'].reset();
});
