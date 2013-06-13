
define(function(){

  var presentDays = function(duration){
    var result = "";
    if(duration.days() > 0){
      result += duration.days()+"d ";
    }
    return result;
  };

  var present = function(duration){
    var result = "";
    result += presentDays(duration);
    result += duration.hours();
    result += ":"
    if(duration.minutes() > 9){
      result += duration.minutes();
    }else{
      result += "0"+duration.minutes();
    }
    return result;
  };

  return {
    present: present  
  }
});
