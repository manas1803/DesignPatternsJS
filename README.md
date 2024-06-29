# Webpack Introduction

## Why Modules ?

1. Maintainiability: - Modules can be added and removed according to use case without disturbing the whole code
2. Readability: - Modules create a section for specific purpose thus making the code more readable.
3. Namespacing: - In JS we have the concept of global variables, and global variables are accessible for all, so if we don't have proper encapsulation(which is provided by modules) then we will end up sharing variables across different code where the variable might not be required causing **namespace pollution**.

## Module Pattern
So we saw the use of modules, in order to incorporate modules in our project, we have different methods: -

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
import {add,multiply,num} from "./app.js"


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

