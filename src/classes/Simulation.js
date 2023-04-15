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

        if(this.reqInProcess(currUserReq)) {
          if(this.userInProcess(user)) continue;

          if(!this.__queue.inQueue(user)){
            currUserReq.setIsWaiting(true);
            this.addQueue(currUserReq, user);
          }
        }else{
          if(this.isNext(currUserReq.id, user)) {
            currUserReq.setIsWaiting(false);
            this.delete(currUserReq, user);
            this.addProcess(user.id, currUserReq);
            this.__queue.addUsing(currUserReq, user);
          }
        }

        // if (!this.inProcess(currUserReq, user)) {
        //   if(this.isNext(currUserReq.id, user)) {
        //     currUserReq.setIsWaiting(false);
        //     this.delete(currUserReq, user);
        //     this.addProcess(user.id, currUserReq);
        //   }
        // } else if (!this.__queue.inQueue(user)) {
        //   currUserReq.setIsWaiting(true);
        //   this.addQueue(currUserReq, user);
        // }
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

  using(){
    return this.__queue.using();
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

  updateQueue(currRes) {
    this.__queue.update(currRes);
  }

  addProcess(currUserId, currUserReq) {   
    currUserReq.setIsExecuting(true); 
    this.__process[currUserId] = currUserReq;
  }

  userInProcess(currUser) {
    return currUser.id in this.__process;
  }

  reqInProcess(currReq) {
    for (const req of Object.values(this.__process)) {
      if (req.id === currReq.id) {
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