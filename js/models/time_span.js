/**
 * Represents a TimeSpan.
 */
define(["moment"],function(moment){

  var create = function(){
    var _start, _end;
    
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

    var checkOut = function(checkout){
      end(checkOut || moment());
    }

    return {
      start: start,
      end: end,
      checkOut: checkOut,
      duration: duration,
      toString: toString
    }
  };

  return {
    create: create
  };
});
