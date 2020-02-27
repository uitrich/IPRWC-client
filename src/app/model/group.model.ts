import { Account } from './Account.model';

export class Group {
  private _id: number = 0;
  private _name: string;
  private _system: boolean;
  private _internalReference: string;
  private _editable: boolean;
  private _groups: Group[];
  private _members: Account[];

  constructor(id: number,
              name: string,
              system: boolean = false,
              internalReference?: string,
              editable: boolean = true,
              group: Group[] = [],
              members: Account[] = []
  ) {
    this._id = id;
    this._name = name;
    this._system = system;
    this._internalReference = internalReference;
    this._editable = editable;
    this._groups = group;
    this._members = members;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get system(): boolean {
    return this._system;
  }

  set system(value: boolean) {
    this._system = value;
  }

  get internalReference(): string {
    return this._internalReference;
  }

  set internalReference(value: string) {
    this._internalReference = value;
  }

  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;
  }

  get groups(): Group[] {
    return this._groups;
  }

  set groups(value: Group[]) {
    this._groups = value;
  }

  get members(): Account[] {
    return this._members;
  }

  set members(value: Account[]) {
    this._members = value;
  }
}
