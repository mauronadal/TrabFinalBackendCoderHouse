const logout = async () => {
  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });

    const data = await response.json();
    if (Object.keys(data)[0] === 'success') {
      alert(data.success);
    } else {
      console.log(data);
      throw new Error(data);
    }
  } catch (error) {
    console.log(error);
  }
  window.location.replace('/');
};
