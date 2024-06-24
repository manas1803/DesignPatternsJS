# Webpack Introduction

## Why Modules ?

1. Maintainiability: - Modules can be added and removed according to use case without disturbing the whole code
2. Readability: - Modules create a section for specific purpose thus making the code more readable.
3. Namespacing: - In JS we have the concept of global variables, and global variables are accessible for all, so if we don't have proper encapsulation(which is provided by modules) then we will end up sharing variables across different code where the variable might not be required causing **namespace pollution**.

## Module Pattern

So we saw the use of modules, in order to incorporate modules in our project, we have different methods: -

### Annonymus Closure

Using the annonymus closure method we hide the variables from global namespace and the function is executed as soon as it is invoked

```js
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
})();
```