const signupForm = document.querySelector('#signup-form');
const file = document.querySelector('#input-photo');
const image = document.querySelector('#image-preview');

function renderImagePreview(formData) {
  const file = formData.get('photo');
  const imageUrl = URL.createObjectURL(file);
  image.setAttribute('src', imageUrl);
}

file.addEventListener('change', () => {
  let formData = new FormData(signupForm);
  renderImagePreview(formData);
});

signupForm.onsubmit = async (e) => {
  e.preventDefault();

  let formData = new FormData(signupForm);

  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (Object.keys(data)[0] === 'success') {
      alert(data.success);
      window.location.replace('/login.html');
    } else {
      if (Object.keys(data)[0] === 'errors') {
        let errorsTemplate = data.errors
          .map((error) => {
            return error.msg;
          })
          .join('\n');
        alert(errorsTemplate);
      } else {
        alert(data.error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
