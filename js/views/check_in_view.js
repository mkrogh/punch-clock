
define(["util/dom"], function($){
  var removeClass = function(elm, cssClass){
    var classes = elm.className;
    elm.className = classes.replace(cssClass,"");
  }
  var addClass = function(elm, cssClass){
    var classes = elm.className;
    if(classes.indexOf(cssClass) === -1){
      elm.className = classes + " "+cssClass;
    }
  }
  return {
    create: function(service, root){
      var checkin_btn =  $("#check-in", root)[0];
      var checkout_btn =  $("#check-out", root)[0];

      var checkin = function(e){
        e.preventDefault();
        service.addNew();
        
        //UI
        addClass(checkin_btn, "hidden"); 
        removeClass(checkout_btn, "hidden");
        removeClass(checkout_btn, "disabled");
      }

      var checkout = function(e) {
        e.preventDefault();
        service.last().checkOut();

        removeClass(checkin_btn, "hidden");
        addClass(checkout_btn, "hidden");
      }

      //Hookin to UI
      checkin_btn.addEventListener("click",checkin); 
      checkout_btn.addEventListener("click",checkout); 

      var handleCleanup = function(){
        removeClass(checkin_btn, "hidden");
        addClass(checkout_btn, "hidden");
      }
      service.track_delete(handleCleanup);

      //Setup
      var last = service.last();
      if(last){
        if(last.isCheckedOut()){
          //DO nothing
        }else{
          addClass(checkin_btn,"hidden");
          removeClass(checkout_btn,"hidden");
          removeClass(checkout_btn,"disabled");
        }
      }
    }
  }
});
