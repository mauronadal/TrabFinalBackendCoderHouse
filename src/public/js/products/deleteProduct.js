const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/productos/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      await viewProducts();
    } else {
      alert(`${data.error} ${data.description}`);
    }
  } catch (error) {
    console.log(error);
  }
};