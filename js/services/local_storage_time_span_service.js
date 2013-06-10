
define(["services/time_span_service", "models/simple_storage", "serializers/time_span_serializer", "serializers/time_span_deserializer","util/util"], function(TimeSpanService, SimpleStorage, TimeSpanSerializer, TimeSpanDeserializer, _){
  return {
    create: function(storage){
      var _storage = storage || SimpleStorage.create();
      var simple_service = TimeSpanService.create();
      


      var store = function(){
       _storage.save("time_spans", JSON.stringify(simple_service.all));
      }
      //Add observers to add actions..
        //Add change observer to new time spans
        simple_service.track_add(function(time_span){
          store();
          time_span.trackChange(function(span){
            //Trigger serialization of all to local storage
            store();
          });
        });

        simple_service.track_delete(function(){
          _storage.reset();
        });

      //Load from local_storage.
      var old_timespans = _storage.fetch("time_spans");
      if(old_timespans){
        var time_spans = JSON.parse(old_timespans);
        _.each(time_spans, function(time_span){
          if(typeof time_span === "string"){
            simple_service.add(TimeSpanDeserializer.deserialize(time_span));
          }else{
            simple_service.add(TimeSpanDeserializer.from_object(time_span));
          }
        });
      }

      return simple_service;
    }
  }
});//END define
