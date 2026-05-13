import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const datetime_picker = document.querySelector('.js-datetime-picker');
const startBtn = document.querySelector('.js-start');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() <= 0) {
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetime_picker, options);

const timer = {
  deadline: null,
  intervalId: null,
  refs: {
    days: document.querySelector('.js-timer-days'),
    hours: document.querySelector('.js-timer-hours'),
    minutes: document.querySelector('.js-timer-minutes'),
    seconds: document.querySelector('.js-timer-seconds'),
  },

  start() {
    this.deadline = userSelectedDate;
    datetime_picker.disabled = true;
    startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      this.refs.days.textContent = this.pad(days);
      this.refs.hours.textContent = this.pad(hours);
      this.refs.minutes.textContent = this.pad(minutes);
      this.refs.seconds.textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    datetime_picker.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
});
