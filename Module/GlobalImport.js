(function(globalVariable){
    const privateFunction = function() {
        console.log('Shhhh, this is private!');
      }
        globalVariable.map = function(collection, iterator) {
        const mapped = [];
        globalVariable.each(collection, function(value, key, collection) {
          mapped.push(iterator(value));
        });
        return mapped;
      };
})(globalVariable)