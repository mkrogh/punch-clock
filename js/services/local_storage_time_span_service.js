
define(["services/time_span_service", "serializers/time_span_serializer"], function(TimeSpanService, TimeSpanSerializer){
  return {
    create: function(){
      var simple_service = TimeSpanService.create();
      
      //Load from local_storage.

      //Add observers to add actions..
        //Add change observer to new time spans
        simple_service.track_add(function(time_span){
          time_span.trackChange(function(span){
            //Trigger serialization of all to local storage
          });
        });
      return simple_service;
    }
  }
});//END define
