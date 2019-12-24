export class Body_Location {
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
  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }
  private _id: number ;
  private _name: string;
}
