const formData = { email: '', message: '' };

const refs = {
  'feedback-form': document.querySelector('.js-feedback-form'),
};

try {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (data) {
    for (const key of Object.keys(data)) {
      refs['feedback-form'].elements[key].value = data[key];
      formData[key] = data[key];
    }
  }
} catch (e) {
  console.log(e);
}

refs['feedback-form'].addEventListener('input', onFieldUpdate);
refs['feedback-form'].addEventListener('submit', onFormSubmit);

function onFieldUpdate(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  for (const value of Object.values(formData)) {
    if (!value) {
      alert('Fill please all fields');
      return;
    }
  }

  console.log('Submitted:', formData);

  localStorage.removeItem('feedback-form-state');
  refs['feedback-form'].reset();
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
}