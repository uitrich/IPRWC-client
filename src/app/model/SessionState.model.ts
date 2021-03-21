

export class SessionState{
  private _valid: boolean;
  private _lastActivity: Date;
  private _accountId: string;


  constructor(valid: boolean, lastActivity: string, accountId: string) {
    this._valid = valid;
    this._lastActivity = new Date(lastActivity);
    this._accountId = accountId;
  }


  get valid(): boolean {
    return this._valid;
  }

  get lastActivity(): Date {
    return this._lastActivity;
  }

  get accountId(): string {
    return this._accountId;
  }

}
