import {Body_Location} from './Body_Location.model';
import {Category} from './Category.model';
import {Company} from './Company.model';

export class Product {
  private _name: string;
  private _price: number;
  private _body_location: Body_Location;
  private _category: Category;
  private _company: Company;
  private _id: number;
  private _image: string;
  private _quantity = 1;
  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get company(): Company {
    return this._company;
  }

  set company(value: Company) {
    this._company = value;
  }
  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }
  get body_location(): Body_Location {
    return this._body_location;
  }

  set body_location(value: Body_Location) {
    this._body_location = value;
  }
  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  toObject() {
    return {
      name: this.name,
      id: this.id,
      image: this.image,
      body_location: this.body_location,
      company: this.company,
      category: this.category,
      price: this.price
    };
  }
}
