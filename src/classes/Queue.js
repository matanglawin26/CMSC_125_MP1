import Resource from "./Resource";

class Queue {
    constructor(resList) {
        this.__queue = {};
        this.__using = {}
        resList.forEach((resId) => {
            this.__queue[resId] = [];
            this.__using[resId] = 0;
        });
    }
  
    queue(){
        return this.__queue
    }

    using(){
        return this.__using;
    }

    enqueue(currProcess, currRes, currUser) {
        let waitTime;
        let firstUser = 0;
        let lastItem = this.lastQueue(currRes.id);

        for (let [userId, res] of Object.entries(currProcess)) {
            if (currRes.id == res.id) {
                waitTime = res.time();
                firstUser = userId;
            }
        }

        if (lastItem) {
            const { user, req } = lastItem;
            waitTime = req.time();
            waitTime += user.currReq().time();
        }

        this.__queue[currRes.id].push({user: currUser, req: new Resource(currRes.id, waitTime)});
        this.__using[currRes.id] = firstUser;
    }
  
    dequeue(req, currUser) {
        const currReq = this.__queue[req.id];
        if (currReq.length) {
            const { user, req } = currReq[0];
            if (user.id == currUser.id) {
                this.__queue[req.id] = this.__queue[req.id].slice(1);         
            }
        }
    }
  
    update(currRes) {
        const currQueue = this.__queue[currRes.id]
        if(currQueue.length){
            for (let { req } of currQueue) {
                req.decrement()
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

    setUsing(req, currUserId){
        this.__using[req.id] = currUserId;
    }
}

export default Queue;