import {Account} from '../model/Account.model';

export class Validator {
  static errorList: string[] = [
    'mailAddress',
    'password',
    'category',
    'name'
  ];
  static ClassifyBackendResponse(responseMessage: string) {
    const res: string[] = [];
    this.errorList.forEach(value => {
      if (responseMessage.includes(value)) {
        res.push(value);
      }
    });
    return res;
  }
}
