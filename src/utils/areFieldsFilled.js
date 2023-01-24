const areFieldsFilled = (data) => {
  const { name, description, code, thumbnail, price, stock } = data;

  if (!name || !description || !code || !thumbnail || !price || !stock) {
    return false;
  }
  return true;
};

export default areFieldsFilled;
