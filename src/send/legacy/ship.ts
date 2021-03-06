import {sendImage} from '../sendImage';
import {waitSomeTime} from './waitSomeTime';
import {confirmSending} from './confirmSending';
import {formatFormToItemInfo} from '../../publish/formatFormToItemInfo';
import {getNewImageByLocalUri} from './getNewImageByLocalUri';
import {sendItemCreationRequest} from './sendItemCreationRequest';
import {associateLocalAndRemoteImages} from './associateLocalAndRemoteImages';
import {send} from '../send';

export async function ship(itemFormData: ItemFormData, callback: () => any) {
  const id = Math.random();

  const shipment: Shipment = {
    id,
    images: [],
    sent: false,
    itemInfoSent: false,
    itemFormData: itemFormData,
    itemInfo: formatFormToItemInfo(itemFormData),
  };

  send.sendings[id] = shipment;

  shipment.images = await Promise.all(
    Object.keys(itemFormData.images).map(getNewImageByLocalUri),
  );

  while (!shipment.sent) {
    try {
      if (!shipment.itemInfoSent) {
        shipment.savedItem = await sendItemCreationRequest(shipment);
        shipment.itemInfoSent = true;
        // console.error('item info saved', shipment.savedItem);
      } else {
        associateLocalAndRemoteImages(shipment);
        await Promise.all(
          shipment.images.map(image => sendImage(image, shipment.savedItem.id)),
        );
        const savedItem = await confirmSending(shipment.savedItem.id);
        shipment.savedItem = savedItem;
        // console.error('enviado com sucesso', shipment);
        shipment.sent = true;
      }
    } catch (err) {
      console.error(
        'erro no primeiro loop',
        JSON.stringify(err?.response) || err,
      );
      if (err?.response?.status === 401 || err?.response?.status === 400) {
        return;
      } else {
        await waitSomeTime();
      }
    }
  }

  send.sendings[id] = shipment;

  if (callback) {
    callback();
  }
}
