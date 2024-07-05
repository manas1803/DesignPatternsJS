import Dogs from "./PrototypeClass.mjs";

const dog1 = new Dogs("Labradoodle",3)
const dog2 = new Dogs("Beagle",4)

console.log(`Dog is ${dog1.name}, his age is ${dog1.age} and his general habits are ${dog1.bark} and ${dog1.wagTail}`)

console.log(`Dog is ${dog2.name}, his age is ${dog2.age} and his general habits are ${dog2.bark} and ${dog2.wagTail}`)