# Design Patterns In Javascript

## Module Pattern
Using Module as a design pattern is very commmon. There are various reasons to go for modules. Few of them are follows

1. Maintainiability: - Modules can be added and removed according to use case without disturbing the whole code
2. Readability: - Modules create a section for specific purpose thus making the code more readable.
3. Namespacing: - In JS we have the concept of global variables, and global variables are accessible for all, so if we don't have proper encapsulation(which is provided by modules) then we will end up sharing variables across different code where the variable might not be required causing **namespace pollution**.

### Annonymus Closure

Using the annonymus closure method we hide the variables from global namespace and the function is executed as soon as it is invoked.What’s nice about this approach is that is that you can use local variables inside this function without accidentally overwriting existing global variables, yet still access the global variables, like so:


```js
var global = "Hello World"
(function () {
  var myGrades = [93, 95, 88, 0, 55, 91];

  var average = function () {
    var total = myGrades.reduce(function (accumulator, item) {
      return accumulator + item;
    }, 0);

    return "Your average grade is " + total / myGrades.length + ".";
  };

  var failing = function () {
    var failingGrades = myGrades.filter(function (item) {
      return item < 70;
    });

    return "You failed " + failingGrades.length + " times.";
  };

  console.log(failing());
  console.log(global)
})();
```

### Global Import
This method is used by libraries like jQuery. It is exactly similar to the previous method with the only difference that the global variable is passed as a parameter. This distinction helps the developer in readability of the code.

```js
(function (globalVariable) {
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  }
    globalVariable.map = function(collection, iterator) {
    var mapped = [];
    globalUtils.each(collection, function(value, key, collection) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

})(globalVariable);
```

### Object Interface
In the object interface approach we return an object with different values that we want to expose outside and the things that we want to keep private we don't return them

```js
const gradesCalculation = (function(){
  const grades = [100,98,87,67]

  return{
    passing: function(){
      console.log("You are passing")
    },
    failing: function(){
      console.log("You are failing")
    }
  }
})()

gradesCalculation.passing()
```

### Revealing Module Pattern
It is exactly similar to object interface pattern but in this pattern we make everything private until specifically returned

```js
const gradesCalculation = (function(){
  const grades = [98,97,92,87]
  
  const passing = ()=>{
    console.log("You are passing")
  }

  const failing = ()=>{
    console.log("You are failing")
  }

  return {
    passing:passing
  }
})()

gradesCalculation.passing()
```

 > All the above module pattern have something in common. First they make use of the global variable and secondly they are using functional closure. But there is a problem with this approach. <br>
 Firstly suppose we have two modules with same name, this can again result in *namespace pollution*<br>
 Secondly we need to be very sure of the dependencies of various module and according load in correct order 

 ### CommonJS
 To deal with the above issues we have a new Module pattern that was developed by team of CommonJS and is referred as commonjs method of module export. CommonJS is a volunteer working group that designs and implements JavaScript APIs for declaring modules.
 <br>
 Basically in CommonJS what we do is we have a global variable as exports inside module and we assign the module that we want to export to this value.<br> Now in the file where we want to use this module we simply use *require* and the path of the file to reterieve all exports
<br>
With CommonJS, each JavaScript file stores modules in its own unique module context (just like wrapping it in a closure). In this scope, we use the module.exports object to expose modules, and require to import them.

 ```js
function myModule() {
  this.hello = function() {
    return 'hello!';
  }

  this.goodbye = function() {
    return 'goodbye!';
  }
}

module.exports = myModule;
 ```

 > **Issue With CommonJS**<br> The main issue with commonJS approach is that it is synchronous, i.e. all the modules load in the order they are called.While that approach works when working in server(Node) but when working in browser it causes delay and increase in waitTime

 ### AMD(Asynchronous Module Definition) 
 So to deal with the above issues with CommonJS we have AMD pattern. Here is a piece of code to understand AMD

 ```js
 define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
  console.log(myModule.hello());
});
 ``` 
Whats happening here is the define method takes in two parameters :- 
1. An array of dependencies. These dependencies are loaded in the background (in a non-blocking manner), and once loaded define calls the callback function it was given.
2. A callback function which calls these dependencies as its parameter and we can use the dependencies in our function. 

>**Note** The dependencies in turn needs to be also defined in the same way as the new function

For example *myModule* can look like
```js
define([], function() {

  return {
    hello: function() {
      console.log('hello');
    },
    goodbye: function() {
      console.log('goodbye');
    }
  };
});
```
> The issue with AMD is that code is more verbose to write

### UMD (Universal Module Definition)
To make use of the best worlds of both i.e. CommonJS and AMD we have yet another module definition method, and that is known as UMD. In UMD according to the situation we have the type of module definition. A typical UMD code can be as :-

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
    define(['myModule', 'myOtherModule'], factory);
  } else if (typeof exports === 'object') {
      // CommonJS
    module.exports = factory(require('myModule'), require('myOtherModule'));
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.myModule, root.myOtherModule);
  }
}(this, function (myModule, myOtherModule) {
  // Methods
  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      hello: hello,
      goodbye: goodbye
  }
}));
```

### ES6 Modules
With ES6 the concept of using modules was made very easy looking at the above methodologies that were being used the main reasoning was to make the code writing easy just like CommonJS while keeping the good points of UMD and AMD methods

In ES6 we simply use the `export` keyword to export a given module. The exporting of the module is also divided into two parts :- 
1. Named Exports
2. Default Exports

#### Named Exports 
In named exports we since start adding `export` keyword to each and every `function` or `variable` that needs to be exported and utilised in some other module or file.

<br>**Example**

index.js file
```js
import {add,multiply,num} from "./app"


const addedNumbers = add(3,5)
const product = multiply(5)
console.log("Number is ",num)
```
app.js file
```js
export const num = 10;

export const add = (a,b)=>{
  return a+b
}

const secretNumber = 20;

export const multiply = (num)=>{
  return num*secretNumber;
}
```
For a given module we can have multiple named exports/imports

#### Default Exports

For a given module we can only have one default export/import. When using the default export/import along with the already export/import keywords we have default keyword

<br>**Example**

index.js file
```js
import multiply, { add, num } from "./app";


const addedNumbers = add(3,5)
const product = multiply(5)
console.log("Number is ",num)
```
app.js file
```js
export const num = 10;

export const add = (a,b)=>{
  return a+b
}

const secretNumber = 20;

const multiply = (num)=>{
  return num*secretNumber;
}

export default multiply
```

## Singleton Pattern
In singleton design pattern we restrict the instantiation of certain classes to one single instance. This single instance is unmodifiable and can be accessed globally throughout the application.

### Problem Solved
1. To provide single instance to a class
2. Provide a global access point to that class

### Implementation 
1. Make default constructor private, to prevent other objects from using it
2. Create a static creation method that acts as a constructor

#### Using Classes
Creating a singleton with an ES15 classes can be done as follows

```js
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

```

> **What is this Object.freeze()**<br> the method object freeze is there to stop the mutation of any object that has been created. Like `const` is there to stop the re-declaration of a variable, but when we create an object the using `const`, reference cannot be changed, but we can still mutate the object, so to avoid that we have `Object.freeze()`

#### Using Objects
We can even use Objects to create singleton design pattern without using the classes.

```js
let counter=0;
const counterObject = {
  getCount:()=>counter;
  increment:()=>counter++;
  decrement:()=>counter--;
}

const singletonCounter = Object.freeze(counterObject)
export default singletonCounter
```

> **Very Important**<br> Unnecessary: ES2015 Modules are singletons by default. We no longer need to explicitly create singletons to achieve this global, non-modifiable behavior.

### Real-World Example 
The government is an excellent example of the Singleton Pattern. A country can have only one official government.

## Proxy Pattern
The idea of the proxy pattern is very straight forward, we will not use directly the object, but rather an intermediate object, that in turn will return us the values. <br>For example sake its just like when we use **proxy** for our attendance, we use someone else on our behalf rather than being present ourselves.<br>We can simple use the `Proxy` inbuilt object of JS to use the `proxy` pattern.

### Problem 
When we have a massive object that we need to access time to time but not always, so for that we should only initialize this object when needed. But this can cause code duplication, so proxy pattern comes to rescue.

### Implementation
The Proxy pattern suggests that you create a new proxy class with the same interface as an original service object. Then you update your app so that it passes the proxy object to all of the original object’s clients.

#### Using Target
**Example**
```js
const person = {
  name:"Bruce",
  age: 34,
  email:"darkKnight@gotham.com",
  city:"Gotham",
  country:"USA"
}

const batmanProxy = new Proxy(person,{
  get:(target,prop)=>{
    console.log("Target is ",target)
    return target[prop]
  },
  set:(target,prop,value)=>{
    target[prop]=value
    console.log("Value is ",value)
    return true
  }
})
```
#### Using Reflect
We have another way of `getting` object value as well as `setting` it. This can be achieved using `Reflect` method.<br>
Instead of accessing properties through `obj[prop]` or setting properties through `obj[prop] = value`, we can access or modify properties on the target object through `Reflect.get()` and `Reflect.set()`.

**Example**
```js
const person = {
  name:"Bruce",
  age: 34,
  email:"darkKnight@gotham.com",
  city:"Gotham",
  country:"USA"
}

const batmanProxy = new Proxy(person,{
  get:(target,prop)=>{
    console.log("Target is ",target)
    return Reflect.get(target,prop)
  },
  set:(target,prop,value)=>{
    Reflect.set(target,prop,value)
    console.log("Value is ",value)
    return true
  }
})
```

### Real-World Example
A credit card is a proxy for a bank account, which is a proxy for a bundle of cash. Both implement the same interface: they can be used for making a payment.

## Observer Pattern
The basic idea of observer pattern is that, a stream of events are currently happening and if the user is interested then they can get the information, if they have subscribed to the event.<br> If we take a basic analogy, suppose you want a new brand of phone, now you cannot go to the store everyday, rather its better if you get notified when the smartphone is available<br> This is what followed in observer pattern.<br>The Observer pattern suggests that you add a subscription mechanism to the publisher class so individual objects can subscribe to or unsubscribe from a stream of events coming from that publisher.<br>
**What is this publisher class?**
Basically, the object which emits all the events continuous as stream of data is called publisher, now all of the users may not want the data, so only those who `subscribe` to the data receives it, and those who subscribe are known as `consumers`.

### Problem
If you are interested in some stream of data that continuosly notifies you but you don't want others to access the same, since they don't want the data, then in that case we use the observer pattern

### Implementation
We can simply create an array of observers and create an object that has notify, subscribe and unsubscribe methods.

```js
let observers=[]
export default Object.freeze({
  notify:(data)=>observers.forEach((observer)=>observer(data)),
  subscribe:(func)=>observers.push(func),
  unsubscribe:(func)=>{
    [...observers].forEach((observer,index)=>{
      if(observer===func){
        observers.splice(index,1)
      }
    })
  }
})
```

### Real-World Example
If you subscribe to a newspaper or magazine, you no longer need to go to the store to check if the next issue is available.

## Prototype Pattern
In a scenario when we have similar type of objects and we want to copy most of the data from that object to new object in that case we use prototype pattern. What we do basically is we create a generic object, since most of the things are going to be same, and then we derieve other objects from this object.

### Problem
The Prototype pattern delegates the cloning process to the actual objects that are being cloned. The pattern declares a common interface for all objects that support cloning. 

### Implementation

``` js
class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    console.log(`${this.name} is barking!`);
  }
  wagTail() {
    console.log(`${this.name} is wagging their tail!`);
  }
}

const dog1 = new Dog("Max", 4);
const dog2 = new Dog("Sam", 2);
```

### Real-World Example
In real life, prototypes are used for performing various tests before starting mass production of a product

# Design Patterns in React

## Container/Presentation Pattern
Container and Presentation pattern is basically a design pattern in `React`. In this pattern we just normally try to separate the code concerns. So basically we create a `container` that handles all the `data` related code, like code related to redux and state, while the `presentation` part takes care of how the data will look in **UI**.

### Problem 
If we want to keep both the data/api logic and UI logic we can use the design pattern. This helps in testing and debugging the issues properly

### Implementation

``` jsx
import React from "react";
import { LoadingListings, Listing, ListingsGrid } from "../components";

function ListingsContainerComponent() {
  const [listings, setListings] = React.useState([]);

  React.useEffect(() => {
    fetch("https://my.cms.com/listings")
      .then((res) => res.json())
      .then((res) => setListings(res.listings));
  }, []);

  return <Listings listings={listings} />;
}

function ListingsPresentationalComponent(props) {
  if (props.listings.length === 0) {
    return <LoadingListings />;
  }

  return (
    <ListingsGrid>
      {listings.map((listing) => (
        <Listing listing={listing} />
      ))}
    </ListingsGrid>
  );
}
```

## HOC(Higher-Order Components) Pattern
The basic idea of `HOC` pattern is that we create a component and then that component gets wrapped by another component. Based on some logic either we do some changes to this component or render the same component as it is. The component is passed as a prop to the higher order component

### Implementation
```jsx

function withLargerFontSize(Component){
  return (props)=>{
    const style = {
      fontSize:"1.5rem",
      ...props.style
    };
    return (<Component {...props} style={style}>)
  }
}

const Text = () => <p style={{ fontFamily: "Inter" }}>Hello world!</p>;
const StyledText = withLargerFontSize(Text);

```
## Render Props Pattern
In this design pattern we basically pass a component as a `prop` and this component can receive props of the parent component as well. It is different from `HOC` method where we just pass component as prop and then wrap it around with some small changes

```jsx
import React, { useState } from "react";

function Input(props) {
  const [value, setValue] = useState(0);

  return (
    <>
      <input type="number" onChange={(e) => setValue(e.target.value)} />
      {props.renderKelvin({ value: Number(value) + 273 })}
      {props.renderFahrenheit({ value: (value * 9) / 5 + 32 })}
    </>
  );
}

function App() {
  const renderKelvin = ({value}) => <div>The value is {value}</div>;
  const renderFahrenheit = ({value}) => <div>The value is {value}</div>;

  return (
    <div className="App">
      <Input renderKelvin={renderKelvin} renderFahrenheit={renderFahrenheit} />
    </div>
  );
}

export default App;

```