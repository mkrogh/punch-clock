var _ = simpleDash = (function(){
  var each = function(elements, fn){
    for(var i = 0; i < elements.length; i++){
      //Call function with args (element, index)
      fn.call(elements[i],elements[i],i);
    }
  };
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
    observable: observable
  };

})();
