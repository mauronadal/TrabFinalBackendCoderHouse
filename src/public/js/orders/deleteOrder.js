const deleteOrder = async (id) => {
  try {
    const response = await fetch(`/api/ordenes/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    if (Object.keys(data)[0] !== 'error') {
      alert(data.success);
      viewOrders();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
