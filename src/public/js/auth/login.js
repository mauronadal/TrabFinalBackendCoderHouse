const loginForm = document.querySelector('#login-form');

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  let formData = new FormData(loginForm);
  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (Object.keys(data)[0] === 'success') {
      alert(data.success);
      window.location.replace('/');
    } else if (Object.keys(data)[0] === 'errors') {
      let errorsTemplate = data.errors
        .map((error) => {
          return error.msg;
        })
        .join('\n');
      alert(errorsTemplate);
    }
  } catch (error) {
    alert('Credenciales incorrectas. Intenta nuevamente.');
  }
};
