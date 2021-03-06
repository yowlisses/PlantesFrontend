import {brokenSendLink} from './legacy/brokenSendLink';
import {getUploadInfo} from './legacy/getUploadInfo';
import {pushImage} from './legacy/pushImage';
import {waitSomeTime} from './legacy/waitSomeTime';

export async function sendImage(image: Image) {
  //handle concurrency
  let key: string;
  let sendLink: string;
  while (!image.sent) {
    if (!image.sendLink) {
      try {
        const uploadInfo: UploadInfo = await getUploadInfo();
        sendLink = uploadInfo.sendLink;
        key = uploadInfo.key;
        image.sendLink = sendLink;
        image.key = key;
        console.error('send link got', image.sendLink);
      } catch (err) {
        console.error('error getting send link', err.response || err);
        await waitSomeTime();
      }
    } else {
      try {
        await pushImage(image);
        image.sendLink = sendLink;
        image.key = key;
        image.sent = true;
      } catch (err) {
        console.error('error sending image: ', image.localUri, err);
        if (err === brokenSendLink) {
          image.sendLink = undefined;
        } else if (err?.status === 400) {
          return;
        } else {
          await waitSomeTime();
        }
      }
    }
  }
  console.error('image sent ' + image.localUri);
}
