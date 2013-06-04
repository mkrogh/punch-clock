define(function(){
  return {
    create: function(backend){
      var _storage = {};
      if(backend){
        _storage = backend;
      }

      return {
        save: function(key, value){
          _storage[key] = value;
        },
        
        fetch: function(key){
          return _storage[key];
        },
        
        reset: function(){
          if(_storage.clear){
            _storage.clear();
          }else{
            _storage = {};
          }
        }

      }
    }
  };
});
