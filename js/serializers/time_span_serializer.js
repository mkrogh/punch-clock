
define(function(){
  var fix_timezone_bug = function(time){
    var result = time.clone();
    result.add(time.zone(), "minutes");
    return result;
  }
  var serialize_time_span = function(time_span){
      var result = {
        time_span: {
          start: fix_timezone_bug(time_span.start()),
        }
      }
      
      if(time_span.end()){
        result.time_span.end = fix_timezone_bug(time_span.end())
      }
    return JSON.stringify(result);
  };

  return {
    serialize: serialize_time_span
  }
});
