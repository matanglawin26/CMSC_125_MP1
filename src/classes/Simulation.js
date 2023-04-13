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
          currUserReq.setIsWaiting(false);
          this.delete(currUserReq, user);
          this.addProcess(user.id, currUserReq);
        } else if (!this.__queue.inQueue(user)) {
          currUserReq.setIsWaiting(true);
          this.addQueue(currUserReq, user);
        }
      }
    }
    console.log("THIS PROCESS: ", this.__process)
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

  getUser(currUserId){
        // console.log("GET USER: ",currUserId, "TYPE: ", typeof currUserId);
        // const idx = this.__users.find(user => `U${user.id}` === currUserId)
        // console.log(this.__users.find(user => user.id === currUserId));
        // for(let i = 0; i < this.__users.length; i++){
        //   console.log("ITEM: ",this.__users[i],"ID: ",this.__users[i].id);
        //   if(this.__users[i].id ===  currUserId) return this.__users[i];
        // }
        return this.__users.find(user => user.id === currUserId);
        // return this.__users.find(user => `U${user.id}` === currUser)
      }
  status(){
    // console.log("IN STATUS SIM:\n");
    // for(let i = 0; i < this.__users.length; i++){
    //   const currUser = this.__users[i];
    //   console.log(`USER ${currUser.id}\n--${currUser.reqList()}`)
    // }
    return this.__users
  }
}

export default Simulation;

// class Simulation {
//   constructor(resList, users) {
//     this.__queue = {};
//     resList.forEach((res) => {
//       this.__queue[res] = [];
//     });
//     this.process = {};
//     this.__clock = 0;
//     this.__users = users;
//     this.initialize(users);
//   }

//   initialize(users) {
//     users.forEach((user) => {
//       if (!user.isComplete()) {
//         const currUserReq = user.currReq();
//         if (!this.inProcess(currUserReq.id, user.id)) {
//           // console.log("INIT -> USER: ",user);
//           this.delete(currUserReq.id, user.id);
//           this.addProcess(user.id, currUserReq);
//         } else if (!this.inQueue(user.id)) {
//           // console.log("NAAY PROCESS: ",user)
//           this.addQueue(currUserReq.id, user);
//         }
//       }
//     });
//   }

//   time() {
//     return this.__clock;
//   }

//   timeUp() {
//     this.__clock += 1;
//   }

//   queue() {
//     return this.__queue;
//   }

//   // process() {
//   //   return this.process;
//   // }

//   getUser(currUserId){
//     // console.log("GET USER: ",currUserId, "TYPE: ", typeof currUserId);
//     const idx = this.__users.find(user => `U${user.id}` === currUserId)
//     console.log(this.__users.find(user => user.id === currUserId));
//     // for(let i = 0; i < this.__users.length; i++){
//     //   console.log("ITEM: ",this.__users[i],"ID: ",this.__users[i].id);
//     //   if(this.__users[i].id ===  currUserId) return this.__users[i];
//     // }
//     return this.__users.find(user => user.id === currUserId)
//     // return this.__users.find(user => `U${user.id}` === currUser)
//   }

//   firstQueue() {
//     return Object.fromEntries(
//       Object.entries(this.__queue).map(([res, users]) => [
//         res,
//         users.length > 0 ? users[0] : -1,
//       ])
//     );
//   }

//   addQueue(currResId, currUser) {
//     let timeLeft = 0;
//     const queuedItem = this.__queue[currResId]
//     // for (let [resId, user] of Object.entries(this.__queue)){
//     //   resId = parseInt(resId);
//     //   if(currResId === resId){
        
//         if(queuedItem.length == 0){
//           for (let [userId, res] of Object.entries(this.process)){
//             userId = parseInt(userId);
//             if(currResId === res.id){
//               timeLeft += res.time();
//             };      
//           }
//           // if(this.process[currUser.id]){
//           //   console.log("THIS PROCESS:", this.process[currUser.id].id)
//           //   timeLeft += this.process[currUser.id].time();
//           // }
//         }else{
//           // console.log("TIME: ", res.time())
//           // console.log("CURR QUEUE: ", this.__queue)
//           // console.log("CURR SELECTED QUEUE: ", queuedItem[queuedItem.length - 1])
//           timeLeft += this._getTime(queuedItem[queuedItem.length - 1].currUser, currResId);
//           // timeLeft += queuedItem[queuedItem.length - 1].currUser.currReq().time();
//           timeLeft += queuedItem[queuedItem.length - 1].timeLeft;
//         }
        
//       // }      
//     // }
//     this.__queue[currResId].push({currUser, timeLeft: parseInt(timeLeft)});
//     // this.__queue[currResId].push(currUser);
//   }

//   updateQueue(res) {
//     this.__queue[res] = this.__queue[res].slice(1);
//   }

//   addProcess(currUserId, reqId) {
//     // console.log("IN ADD PROCESS: ",currUserId, "TYPE OF USER: ",typeof currUserId)
//     this.process[currUserId] = reqId;
//     // console.log("UPDATED PROCESS: ", this.process)
//     // console.log("ACCESS PROCESS: ", this.process[currUserId])
//   }

//   inProcess(currReqId, currUserId) {
//     // console.log("IN PROCESS: ",this.process);
//     // console.log("IN PROCESS[UID]: ",this.process[currUserId]);
//     // console.log("IN PROCESS RID: ",currReqId);
//     // console.log("IN PROCESS UID: ",currUserId, "TYPE: ",typeof currUserId);
    
//     // if(this.process[currUserId]){
//     //   return this.process[currUserId].id === currReqId;
//     // }
//     for (let [userId, res] of Object.entries(this.process)){
//       userId = parseInt(userId);
//       if(currReqId === res.id && currUserId !== userId) return true;      
//     }
//     return false;
//     // return Object.entries(this.process).some(([user, req]) => {
//     //   return currReq.id === req.id && currUser !== `U${user.id}`;
//     // });
//   }

//   inQueue(currUserId) {
//     // console.log("IN QUEUE UID: ",currUserId);

//     for (const [resId, userArr] of Object.entries(this.__queue)){
//       // console.log("QUEUE USER ARR: ",userArr);
//       const res = userArr.find(({currUser}) => currUserId === currUser.id);      
//       if(res) return true;
//     }
//     return false;
//     // return Object.entries(this.__queue).some(([req, user_list]) => {
//     //   return user_list.some((user) => currUser === `U${user.id}`);
//     // });

//   }

//   remove(currUser) {
//     delete this.process[currUser];
//   }

//   delete(reqId, currUserId) {
//     const currReq = this.__queue[reqId];
//     if (currReq.length > 0) {
//       // if (`U${currReq[0].id}` === currUser) {
//       if (currReq[0].currUser.id === currUserId) {
//         this.__queue[reqId] = currReq.slice(1);
//         // console.log("UPDATED QUEUE: ",this.__queue);
//       }
//     }
//   }

//   status() {
//     this.__users.forEach((user) => {
//       console.log(
//         `U${user.id} Requests:\n${
//           user.reqList().length > 0 ? user.reqList() : "No Requests Left!"
//         }`
//       );
//     });
//   }

//   _getTime(user, resId){
//     const reqList = user.reqList();
//     for(let i = 0; i < reqList.length; i++){
//       // console.log("IN _GETTIME:", reqList[i]);
//       if(reqList[i].id === resId){
//         return reqList[i].time();
//       }
//     }
//     return 0;
//   }
// }


// export default Simulation;