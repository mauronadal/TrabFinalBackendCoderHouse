const orderList = document.querySelector('#order-list');
const renderOrders = async (data) => {
  let template = '';
  if (data.length) {
    template = data
      .map(
        (order) => `
          <tr>
            <td>
              <details>
                <summary class="mb-2">Productos</summary>
                  ${order.products
                    .map(
                      (product) => `
                        <small>${product.name} - Cant: ${product.quantity} - PU: $ ${product.price}</small>
                        <hr class="dropdown-divider">
                      `
                    )
                    .join('')
                  }
              </details>
            </td>
            <td>${order.clientEmail}</td>
            <td>${order.clientAddress}</td>
            <td>
              <span 
                id="status"
                class="badge ${order.status === 'Generada' ? 'bg-secondary' : 'bg-success'}"
              >
                ${order.status}
              </span>
            </td>
            <td>${order.timestamp}</td>
            ${order.status === 'Generada'
              ? `<td width="20px">
                  <button
                    class="btn btn-sm btn-success" 
                    type="button" 
                    onclick="confirmOrder('${order.id}')"
                  >
                    Confirmar
                  </button>
                 </td>`
              : `<td width="20px">
                  <button
                    disabled
                    class="btn btn-sm btn-success" 
                    type="button" 
                    onclick="confirmOrder('${order.id}')"
                  >
                    Confirmar
                  </button>
                </td>`
            }
            <td width="20px">
              <button 
                class="btn btn-sm btn-danger" 
                type="button" 
                onclick="deleteOrder('${order.id}')"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `
      )
      .join('');
  } else {
    template = `<td class="align-left" colspan="6">Aún no has generado ninguna orden</td>`;
  }
  orderList.innerHTML = template;
};

const viewOrders = async () => {
  try {
    const response = await fetch('/api/ordenes/');
    const data = await response.json();
    renderOrders(data);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await viewOrders();
})();
