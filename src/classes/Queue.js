import Resource from "./Resource";

class Queue {
    constructor(resList) {
        this.__queue = {};
        resList.forEach((res) => {
            this.__queue[res] = [];
        });
    }
  
    queue(){
        return this.__queue
    }

    enqueue(currProcess, currRes, currUser) {
        let waitTime = 0;
        let lastItem = this.lastQueue(currRes.id);
        if (lastItem) {
            const { user, req } = lastItem;
            waitTime += req.time();
            waitTime += user.currReq().time();
        } else {
            for (let [_, res] of Object.entries(currProcess)) {
                if (currRes.id == res.id) {
                    waitTime += res.time();
                }
            }
        }
        this.__queue[currRes.id].push({user: currUser, req: new Resource(currRes.id, waitTime)});
    }
  
    dequeue(req, currUser) {
        let currReq = this.__queue[req.id];
        if (currReq.length) {
            const { user, req } = currReq[0];
            if (user.id == currUser.id) {
                this.__queue[req.id] = this.__queue[req.id].slice(1);         
            }
        }
    }
  
    update() {
        for (let users of Object.values(this.__queue)) {
            for (let { req } of users) {
                if (req.time() > 0) req.decrement()
            }
        }
    }
  
    lastQueue(resId) {
        if (!this.__queue[resId]) return null;        
        return this.__queue[resId].slice(-1)[0];      
    }
  
    inQueue(currUser) {
        for (let userList of Object.values(this.__queue)) {
            for (let userObj of userList) {
                const { user } = userObj;
                if (user.id == currUser.id) return true;                
            }
        }
        return false;
    }
}

export default Queue;