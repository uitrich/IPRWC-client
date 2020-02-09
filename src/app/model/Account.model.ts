import {Group} from './group.model';

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
  get house_number(): string {
    return this._house_number;
  }

  set house_number(value: string) {
    this._house_number = value;
  }
  get postal_code(): string {
    return this._postal_code;
  }

  set postal_code(value: string) {
    this._postal_code = value;
  }
  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }
  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }
  get mailaddress(): string {
    return this._mailaddress;
  }

  set mailaddress(value: string) {
    this._mailaddress = value;
  }
  get groups(): Group[] {
    return this._groups;
  }

  set groups(value: Group[]) {
    this._groups = value;
  }
  private _groups: Group[];
  private _mailaddress: string;
  private _firstname: string;
  private _password: string;
  private _lastname: string;
  private _postal_code: string;
  private _house_number: string;
  private _reference : string;
  private _group: Group[];

  constructor(mailaddress, firstname, password, lastname, postal_code, house_number, reference) {
    this._mailaddress = mailaddress;
    this._firstname = firstname;
    this._lastname = lastname;
    this._postal_code = postal_code;
    this._house_number = house_number;
    this._reference = reference;
  }

}

