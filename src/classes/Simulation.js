import Queue from "./Queue";

class Simulation {
  constructor(resList, users) {
    this.__queue = new Queue(resList);
    this.__process = {};
    this.__clock = 0;
    this.__users = users;
    this.initialize(users);
  }

  initialize(users) {
    for (let user of users) {
      if (!user.isComplete()) {
        let currUserReq = user.currReq();
        if (!this.inProcess(currUserReq, user)) {
          if(this.isNext(currUserReq.id, user)) {
            currUserReq.setIsWaiting(false);
            this.delete(currUserReq, user);
            this.addProcess(user.id, currUserReq);
          }
        } else if (!this.__queue.inQueue(user)) {
          currUserReq.setIsWaiting(true);
          this.addQueue(currUserReq, user);
        }
      }
    }
  }

  time() {
    return this.__clock;
  }

  timeUp() {
    this.__clock += 1;
  }

  queue() {
    return this.__queue.queue();
  }

  process() {
    return this.__process;
  }

  isNext(reqId, nextUser){
    const currQueue = this.__queue.queue()[reqId];
    if(currQueue.length){
      const { user } = currQueue[0];
      return user.id == nextUser.id
    }
    return true;
  }

  addQueue(currRes, currUser) {
    this.__queue.enqueue(this.__process, currRes, currUser);
  }

  updateQueue() {
    this.__queue.update();
  }

  addProcess(currUserId, currUserReq) {   
    currUserReq.setIsExecuting(true); 
    this.__process[currUserId] = currUserReq;
  }

  inProcess(currReq, currUser) {
    for (let [userId, req] of Object.entries(this.__process)) {
      userId = parseInt(userId);
      if (currReq.id == req.id && currUser.id != userId) {
        return true;
      }
    }
    return false;
  }

  remove(currUser) {
    delete this.__process[currUser];
  }

  delete(req, currUser) {
    this.__queue.dequeue(req, currUser);
  }

  inQueue(user) {
    this.__queue.inQueue(user);
  }
}

export default Simulation;