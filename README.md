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

 
