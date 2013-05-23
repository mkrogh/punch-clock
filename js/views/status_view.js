
define(["util/dom","presenters/time_presenter"],function($,TimePresent){
  
  return {
    create: function(service){
      var view = $(".punch-clock")[0];
      var timer;

      var handleCheckin = function(time_span){
        var text = "Check-in at ";
        text += TimePresent.present(time_span.start());
        text += " ("+time_span+")";
        view.textContent = text;
      }

      var handleCheckout = function(time_span){
        var text = TimePresent.present(time_span.start());
        text += " - " + TimePresent.present(time_span.end());
        text += " (" + time_span + ")";
        view.textContent = text;

        clearInterval(timer);
      }

      var track_adds = function(time_span){
        handleCheckin(time_span);
        time_span.trackCheckout(handleCheckout);

        timer = setInterval(function(){
          handleCheckin(time_span);
        }, 30000);
      }

      service.track_add(track_adds);
    }
  }
});
