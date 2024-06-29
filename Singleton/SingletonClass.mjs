let instance;
class Counter {
  constructor(counter) {
    if (instance) {
      throw new Error("Instance already exists");
    }
    this.counter=counter;
    instance=this;
  }
  getCounter(){
    return this.counter;
  }

  increment(){
    return this.increment++;
  }

  decrement(){
    return this.increment--;
  }

}

const singletonClassCounter = Object.freeze(new Counter())

export default singletonClassCounter;
