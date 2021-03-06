function convertToIdentityObject(array) {
  const result = {};
  for (let item of array) {
    result[item] = true;
  }
  return result;
}

function convertToIndexesObject(array) {
  const result = {};
  let counter = 1;
  for (let item of array) {
    result[item] = counter;
    counter++;
  }
  return result;
}

export function formatToEdit(item) {
  const {
    name,
    swap,
    donate,
    description,
    tags: tagsArray,
    amount: amountNumber,
    price: priceNumber,
    images: imagesArray,
  } = item;

  const tags = convertToIdentityObject(tagsArray);
  const images = convertToIndexesObject(imagesArray);
  const price = priceNumber ? '' + priceNumber : null;
  const amount = amountNumber ? '' + amountNumber : null;

  const availabilities = {
    swap,
    donate,
    sell: !!price,
  };

  return {
    name,
    tags,
    price,
    amount,
    images,
    description,
    availabilities,
  };
}
