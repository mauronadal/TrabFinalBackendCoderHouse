const cartList = document.querySelector('#cart-list');
const renderCart = (data) => {
  let template = '';
  if (Object.keys(data)[0] !== 'error') {
    template = data
      .map(
        (product) => `
          <tr>
            <td> <img src="${product.thumbnail}" width="50" height="50" alt="foto producto"> </td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>
              <button class="btn btn-sm btn-danger" type="button" onclick="deleteProductOfCart('${product._id}')">
                Eliminar
              </button>
            </td>
          </tr>
        `
      )
      .join('');
    } else {
      template = `<td class="align-left" colspan="6">Aún no hay productos en el carrito</td>`;
    }
    cartList.innerHTML = template;
};

const viewCartProducts = async () => {
  try {
    const clientId = await getUserId();
    const response = await fetch(`/api/carrito/${clientId}/productos`);
    let data = await response.json();
    if (data.length >= 1) {
      renderCart(data);
    } else {
      data = { error: true };
      renderCart(data);
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await viewCartProducts();
})();
