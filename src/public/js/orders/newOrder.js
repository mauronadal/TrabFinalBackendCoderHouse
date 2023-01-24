const newOrder = async () => {
  try {
    const response = await fetch('/api/ordenes/', {
      method: 'POST',
      body: null
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert(data.success);
      viewCartProducts();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};