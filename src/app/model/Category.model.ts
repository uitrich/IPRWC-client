export class Category {

  private _id: number ;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
  toObject() {
    return { id: this.id, name: this.name};
  }
}
