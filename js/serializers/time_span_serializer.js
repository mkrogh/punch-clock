
define(function(){
  var fix_timezone_bug = function(time){
    var result = time.clone();
    result.add(time.zone(), "minutes");
    return result;
  }

  var times_span_simple_object = function(time_span){
      var result = {
        time_span: {
          start: fix_timezone_bug(time_span.start()).toJSON(),
        }
      }
      
      if(time_span.end()){
        result.time_span.end = fix_timezone_bug(time_span.end()).toJSON()
      }

    return result;
  }

  var serialize_time_span = function(time_span){
    var obj = times_span_simple_object(time_span);
    return JSON.stringify(obj);
  };

  return {
    serialize: serialize_time_span,
    to_obj: times_span_simple_object
  }
});
