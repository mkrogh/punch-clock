
define(["models/time_span", "moment"], function(TimeSpan, moment){
  var serialize_time_span = function(time_span){
      var result = {
        time_span: {
          start: time_span.start(),
          end: time_span.end()
        }
      }
    return JSON.stringify(result);
  };

  var deserialize_time_span = function(json){
    var obj = JSON.parse(json).time_span;
    var time_span = TimeSpan.create();
    time_span.start(moment(obj.start));
    time_span.end(moment(obj.end));

    return time_span;
  };

  return {
    serialize: serialize_time_span,
    deserialize: deserialize_time_span
  }
});
