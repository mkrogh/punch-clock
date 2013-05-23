
define(["moment"],function(moment){
  return {
    present: function(time, compare_to){
      var compare_to = compare_to || moment();
      var result = "";
      if(time){
        var time = moment(time);
        if(time.isSame(compare_to, "day")){
          result = time.format("HH:mm");
        }else if(time.isSame(compare_to, "week")){
          result = time.format("ddd HH:mm"); 
        }else if(time.isSame(compare_to, "year")){
          result = time.format("DD/MM HH:mm"); 
        }else{
          result = time.format("DD/MM-YYYY HH:mm");
        }
      }

      return result;
    }
  }
});
