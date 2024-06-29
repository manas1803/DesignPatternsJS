let counter=0;
const Counter = {
    getCounter:()=>counter,
    increment:()=>counter++,
    decrement:()=>counter--
}

const singletonCounterObject = Object.freeze(Counter)

export default singletonCounterObject;