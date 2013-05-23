
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
    create: function(service){
      var checkin_btn =  $("#checkin")[0];
      var checkout_btn =  $("#checkout")[0];

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
        service.first().checkOut();

        removeClass(checkin_btn, "hidden");
        addClass(checkout_btn, "hidden");
      }

      //Hookin to UI
      checkin_btn.addEventListener("click",checkin); 
      checkout_btn.addEventListener("click",checkout); 

    }
  }
});
