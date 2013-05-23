/**
 * Represents a TimeSpan.
 */
define(["moment", "util/util"],function(moment,_){

  var create = function(){
    var _start, _end;
    var checkin_observer = _.observable();
    var checkout_observer = _.observable();
    
    _start = moment();

    var start = function(start){
      if(start){
        _start = start
      }
      return _start;
    }

    var end = function(end){
      if(end){
        _end = end
      }
      return _end;
    }


    /**
     * Calculates the duration based on start and end time.
     * If the end time is missing the duration will be calculated
     * as if end was set to "NOW".
     */
    var duration = function(){
      var the_end = end() || moment();
    
      return moment.duration(the_end.diff(start()));
    }

    /**
     * Reports duration as a string.
     * E.g: "1:00"
     */
    var toString = function(){
      var diff = duration();
      var result = "";
      result += diff.hours();
      result += ":";
      if(diff.minutes() > 9){
        result += diff.minutes();
      }else{
        result += "0"+diff.minutes();
      }

      return result;
    }

    var checkOut = function(time_stamp){
      end(time_stamp || moment());
      checkout_observer.notify(this);
    }

    return {
      start: start,
      end: end,
      checkOut: checkOut,
      duration: duration,
      toString: toString,
      trackCheckin: checkin_observer.add,
      trackCheckout: checkout_observer.add
    }
  };

  return {
    create: create
  };
});
