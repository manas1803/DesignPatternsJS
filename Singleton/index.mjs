import singletonClassCounter from "./SingletonClass.mjs";
import singletonCounterObject from "./SingletonObject.mjs";

const counterClass = new singletonClassCounter(12)
const counterObject = singletonCounterObject

console.log("Counter object ",counterObject.getCounter())