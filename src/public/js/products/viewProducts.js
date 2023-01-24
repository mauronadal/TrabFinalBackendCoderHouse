const productList = document.querySelector('#product-list');

const renderProducts = (data) => {
  if (Object.keys(data)[0] !== 'error') {
    const template = data
      .map(
        (product) => `
          <div class="col">
              <div class="card text-white">
                  <img src="${product.thumbnail}" class="medium-image card-img-top p-3 mx-auto" alt='not found'>
                  <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text"><b>$ ${product.price}</b> <br> 
                      <small>Código: ${product.code} - Stock: ${product.stock}</small>
                    </p>
                    <p class="card-text">${product.description}</p>
                  </div>
                  <div class="card-footer text-center">
                    <small class='text-muted'>Última edición: ${product.timestamp}</small>
                    <hr/>
                    <button class="btn btn-sm btn-success" type="button" onclick="addToCart('${product.id}')">
                      Agregar al carrito
                    </button>
                    <div class="mt-2">
                      <button class="btn btn-sm btn-light" type="button" data-bs-toggle="modal" data-bs-target="#modal-edit-product" onclick="editProduct('${product.id}')">
                        Editar
                      </button>
                      <button class="btn btn-sm btn-danger" type="button" onclick="deleteProduct('${product.id}')">
                        Eliminar
                      </button>
                    </div>
                  </div>
              </div>
          </div>`
      )
      .join('');
    productList.innerHTML = template;
  } else {
    const template = `
      <div class="col">
        <div class="alert alert-info" role="alert">
          ${data.error}
        </div>
      </div>`;
    productList.innerHTML = template;
  }
};

const viewProducts = async () => {
  try {
    const response = await fetch('/api/productos/listado');
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await viewProducts();
})();