
define(["util/dom","presenters/time_presenter"],function($,TimePresent){
  
  return {
    create: function(service){
      var view = $(".punch-clock")[0];

      var handleCheckin = function(time_span){
        view.textContent ="Check-in at "+TimePresent.present(time_span.start());
      }

      var handleCheckout = function(time_span){
        var text = TimePresent.present(time_span.start());
        text += " - " + TimePresent.present(time_span.end());
        text += " (" + time_span + ")";
        view.textContent = text;
      }

      var track_adds = function(time_span){
         handleCheckin(time_span);
         time_span.trackCheckout(handleCheckout);
      }

      service.track_add(track_adds);
    }
  }
});
