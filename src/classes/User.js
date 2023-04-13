class User {
  constructor(id) {
    this.id = id;
    this._resList = [];
  }

  isComplete() {
    return !this.currReq();
  }

  reqList() {
    return this._resList;
  }

  resRequest(l) {
    this._resList = l;
  }

  currReq() {
    return this._resList.find(resource => !resource.isDone())
    // return this._resList[0];
  }

  dumpReq() {
    this._resList = this._resList.slice(1);
  }

  display() {
    return `U${this.id}\n|-- Requests: ${this._resList.length ? this._resList : ''}`;
  }

  // toString() {
  //   return `U${this.id}`;
  // }
}

export default User;