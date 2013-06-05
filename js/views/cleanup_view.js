
define(["util/dom"],function($){
  
  return {
    create: function(service, root){
      var $view = $("#cleanup", root)[0];
      var $title = $(".title", $view)[0];

      var handleCleanup = function(e){
        e.preventDefault();
        service.delete_all();
      }

      $view.addEventListener("click", handleCleanup);

      /*
       * Track service changes
       */

      var handleServiceChange = function(){
        var text = $title.textContent;
        if(text.indexOf("(") > -1){
          text = text.replace(/\(\d+\)/, "("+service.count()+")");
        }else{
          text += " ("+service.count()+")";
        }

        $title.textContent = text;
      }

      service.track_add(handleServiceChange);

      //On startup
      if(service.count() > 0){
        handleServiceChange();
      }

    }
  }
});
