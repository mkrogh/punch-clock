
define(["util/dom"],function($){
  
  return {
    create: function(service, root){
      var $view = $("#cleanup", root)[0];
      var $title = $(".title", $view)[0];


       var createTitle = function(org_title){
        var text = org_title;
        if(service.count() > 0){
          if(text.indexOf("(") > -1){
            text = text.replace(/\(\d+\)/, "("+service.count()+")");
          }else{
            text += " ("+service.count()+")";
          }
        }else{
          text = text.replace(/ \(\d+\)/,"");
        }
        return text;
       }
      /*
       * Track service changes
       */

      var handleServiceChange = function(){
        var text = $title.textContent;

        $title.textContent = createTitle(text);
      }

      service.track_add(handleServiceChange);
      service.track_delete(handleServiceChange);

      var handleCleanup = function(e){
        e.preventDefault();
        service.delete_all();
      }

      $view.addEventListener("click", handleCleanup);

      //On startup
      if(service.count() > 0){
        handleServiceChange();
      }

    }
  }
});
