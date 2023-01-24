const formEditProduct = document.querySelector('#form-edit-product'),
  inputEditName = document.getElementById('edit-name'),
  inputEditDescription = document.getElementById('edit-description'),
  inputEditCode = document.getElementById('edit-code'),
  inputEditThumbnail = document.getElementById('edit-thumbnail'),
  inputEditPrice = document.getElementById('edit-price'),
  inputEditStock = document.getElementById('edit-stock');

const editProduct = async (id) => {
  try {
    let response = await fetch(`/api/productos/listado/${id}`);
    let data = await response.json();

    inputEditName.setAttribute('value', `${data.name}`);
    inputEditDescription.setAttribute('value', `${data.description}`);
    inputEditCode.setAttribute('value', `${data.code}`);
    inputEditThumbnail.setAttribute('value', `${data.thumbnail}`);
    inputEditPrice.setAttribute('value', `${data.price}`);
    inputEditStock.setAttribute('value', `${data.stock}`);

    formEditProduct.onsubmit = async (e) => {
      e.preventDefault();

      let formData = new FormData(formEditProduct);
      let formDataEdited = {
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        thumbnail: formData.get('thumbnail'),
        price: formData.get('price'),
        stock: formData.get('stock'),
      };

      try {
        let response = await fetch(`/api/productos/${data.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(formDataEdited),
        });

        let result = await response.json();

        if (Object.keys(result)[0] === 'error') {
          alert(`${result.error} ${result.description}`);
        } else {
          await viewProducts();
          const btn = document.querySelector('#btn-cancel-edit');
          btn.click();
        }
      } catch (error) {
        console.log(error);
      }
    };
  } catch (error) {
    console.log(error);
  }
};

const btnCancelEdit = document.querySelector('#btn-cancel-edit');
btnCancelEdit.addEventListener('click', () => {
  formEditProduct.reset();
});
