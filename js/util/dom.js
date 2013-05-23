
define(function(){
    var $ = $ || (function(){
      var $ = function(selector,obj){
        var obj = obj || document;
        return obj.querySelectorAll(selector);
      }
  
      return $;
    })();

    return $;
});
