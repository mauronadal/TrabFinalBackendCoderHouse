const confirmOrder = async (id) => {
  try {
    const response = await fetch(`/api/ordenes/${id}`, {
      method: 'PUT',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert("La orden ha sido confirmada");
      viewOrders();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
