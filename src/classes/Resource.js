class Resource {
  constructor(id, time) {
    this.id = id;
    this.__time = time;
    this.__initialTime = time;
    this.__isWaiting = false;
    this.__isExecuting = false;
  }

  decrement() {
    this.__time -= 1;
  }
  
  time(){
    return this.__time;
  }

  isDone() {
    const result = this.__time <= 0;
    if(result) this.__time = 0;
    return result;
  }

  setIsWaiting(bool){
    this.__isWaiting = bool;
  }
  
  isWaiting(){
    return this.__isWaiting;
  }

  setIsExecuting(bool){
    this.__isExecuting = bool;
  }
  
  isExecuting(){
    return this.__isExecuting;
  }

  toString(flag = false) {
    if(flag) return `R${this.id}, Time: (${this.__initialTime} s)`;
    return this.__isWaiting ? `Waiting for R${this.id}` : `R${this.id}, Time: (${this.__time} s)` ;
  }
}

export default Resource;