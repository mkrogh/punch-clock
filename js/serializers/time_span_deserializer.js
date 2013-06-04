
define(["models/time_span", "moment"], function(TimeSpan, moment){
  var deserialize_time_span = function(json){
    var obj = JSON.parse(json).time_span;
    var time_span = TimeSpan.create();
    time_span.start(moment(obj.start));
    if(obj.end){
      time_span.end(moment(obj.end));
    }

    return time_span;
  };

  return {
    deserialize: deserialize_time_span,
    from_object: function(obj){
      return deserialize_time_span(JSON.stringify(obj));
    }
  }
});
