const deleteProductOfCart = async (productId) => {
  try {
    const clientId = await getUserId();
    const response = await fetch(`/api/carrito/${clientId}/productos/${productId}`, {
      method: 'delete',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert(data.msg)
      viewCartProducts();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
