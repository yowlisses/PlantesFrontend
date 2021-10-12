function convertToIdentityObject(array: string[]): BooleansObj {
  const result = {};
  for (let item of array) {
    result[item] = true;
  }
  return result;
}

function convertRemoteUriToImage(remoteUri: string): Image {
  return {
    remoteUri,
    sent: true,
    localUri: null,
  };
}

export function formatToEdit(item: SavedItem): ItemFormData {
  const {
    name,
    swap,
    donate,
    description,
    tags: tagsArray,
    price: priceNumber,
    images: imagesArray,
    amount: amountNumber,
  } = item;

  const tags = convertToIdentityObject(tagsArray);
  const images = imagesArray.map(convertRemoteUriToImage);
  const price = priceNumber ? '' + priceNumber : undefined;
  const amount = amountNumber ? '' + amountNumber : undefined;

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
