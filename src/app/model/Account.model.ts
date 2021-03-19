import {Group} from './Group.model';

export class Account {

  get reference(): string {
    return this._reference;
  }

  set reference(value: string) {
    this._reference = value;
  }
  get group(): Group[] {
    return this._group;
  }

  set group(value: Group[]) {
    this._group = value;
  }
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
  get houseNumber(): string {
    return this._houseNumber;
  }

  set houseNumber(value: string) {
    this._houseNumber = value;
  }
  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }
  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }
  get mailAddress(): string {
    return this._mailAddress;
  }

  set mailAddress(value: string) {
    this._mailAddress = value;
  }
  get groups(): Group[] {
    return this._groups;
  }

  set groups(value: Group[]) {
    this._groups = value;
  }
  private _groups: Group[];
  private _mailAddress: string;
  private _firstName: string;
  private _password: string;
  private _lastName: string;
  private _postalCode: string;
  private _houseNumber: string;
  private _reference : string;
  private _group: Group[];

  constructor(mailAddress, firstName, password, lastName, postalCode, houseNumber, reference) {
    this._mailAddress = mailAddress;
    this._firstName = firstName;
    this._lastName = lastName;
    this._postalCode = postalCode;
    this._houseNumber = houseNumber;
    this._reference = reference;
  }

}

