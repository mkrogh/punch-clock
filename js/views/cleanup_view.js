
define(["util/dom"],function($){
  
  return {
    create: function(service, root){
      var view = $("#cleanup", root)[0];

      var handleCleanup = function(e){
        e.preventDefault();
        service.delete_all();
      }
      view.addEventListener("click", handleCleanup);
    }
  }
});
