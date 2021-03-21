import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor() {}

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      return reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  convertFromBase64(input: string) {
    const bChar = atob(input);
    const bNum = new Array(bChar.length);
    for (let i = 0; i < bChar.length; i++) {
      bNum[i] = bChar.charCodeAt(i);
    }
    const bArray = new Uint8Array(bNum);
    return new Blob([bArray], {type: 'image/jpeg'});
  }
}
