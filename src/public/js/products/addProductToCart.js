const createCart = async () => {
  try {
    const clientId = await getUserId();
    const response = await fetch(`api/carrito/${clientId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: null,
    });
    const data = await response.json();
    if (Object.keys(data)[0] === 'error') {
      return data.error;
    }

    return data.id;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (productId) => {
  try {
    const cartId = await createCart();

    const response = await fetch(
      `/api/carrito/${cartId}/productos/${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ quantity: 1 }),
      }
    );
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert(data.msg);
    } else {
      alert(`${data.error} ${data.description}`);
    }
  } catch (error) {
    console.log(error);
  }
};
