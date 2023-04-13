class Resource {
  constructor(id, time) {
    this.id = id;
    this.__time = time;
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
    return this.__time <= 0;
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

  toString() {
    return `R${this.id}, Time: (${this.__time} s)`;
  }
}

export default Resource;