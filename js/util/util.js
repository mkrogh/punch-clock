
/**
 * Offers convinience methods:
 *  - each: loops over array and calls function
 *  - observable: creates an observer 
 */
define(function(){
  var each = function(elements, fn){
    for(var i = 0; i < elements.length; i++){
      //Call function with args (element, index)
      fn.call(elements[i],elements[i],i);
    }
  };

  var map = function(elements, fn){
    var result = [];
    each(elements, function(element){
      result.push(fn(element));
    });
    return result;
  }

  var observable = function(){
    var observers = [];
    var addObserver = function(observer){
      observers.push(observer);
    }

    var removeObserver= function(observer){
      var index = observers.indexOf(observer);
      if(index !== -1) observers.splice(index,1);
    }

    var notify = function(what){
      each(observers, function(observer){
        observer(what);
      });
    }

    return {
      add: addObserver,
      remove: removeObserver,
      notify: notify
    };
  };

  return {
    each: each,
    map: map,
    observable: observable
  };
});
