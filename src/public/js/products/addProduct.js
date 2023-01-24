const formAddProduct = document.querySelector('#form-add-product'),
  inputName = document.getElementById('name'),
  inputDescription = document.getElementById('description'),
  inputCode = document.getElementById('code'),
  inputThumbnail = document.getElementById('thumbnail'),
  inputPrice = document.getElementById('price'),
  inputStock = document.getElementById('stock');

formAddProduct.onsubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: inputName.value,
    description: inputDescription.value,
    code: inputCode.value,
    thumbnail: inputThumbnail.value,
    price: inputPrice.value,
    stock: inputStock.value,
  };

  try {
    const response = await fetch('api/productos/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (Object.keys(data)[0] === 'error') {
      alert(`${data.error} ${data.description}`);
    } else {
      viewProducts();
      const btn = document.querySelector('#btn-cancel-add');
      btn.click();
    }
  } catch (error) {
    console.log(error);
  }
};

const btnCancelAdd = document.querySelector('#btn-cancel-add');
btnCancelAdd.addEventListener('click', () => {
  formAddProduct.reset();
});