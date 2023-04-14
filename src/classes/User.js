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
  }
}

export default User;