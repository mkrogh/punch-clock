
define(["models/time_span","moment","serializers/time_span_serializer","serializers/time_span_deserializer"], function(TimeSpan, moment, TimeSpanSerializer, TimeSpanDeserializer){
  var time_span;
  describe("handling fully populated", function(){
    var deserialized;
    beforeEach(function(){
      var serialized;
      time_span = TimeSpan.create();
      time_span.checkOut();
      serialized = TimeSpanSerializer.serialize(time_span);
      deserialized = TimeSpanDeserializer.deserialize(serialized);
    });
    
    it("start should be the same", function(){
      expect(deserialized.start().isSame(time_span.start()));
    });
    
    it("end should be the same", function(){
      expect(deserialized.end().isSame(time_span.end()));
    });
    
    describe("#from_object", function(){
      beforeEach(function(){
        var as_object = TimeSpanSerializer.to_obj(time_span);
        deserialized = TimeSpanDeserializer.from_object(as_object);
      });
      it("start should be the same", function(){
        expect(deserialized.start().isSame(time_span.start()));
      });
    
      it("end should be the same", function(){
        expect(deserialized.end().isSame(time_span.end()));
      });
    });//END 

  });//END full populated

  describe("handling no end", function(){
    var deserialized;
    beforeEach(function(){
      var serialized;
      time_span = TimeSpan.create();
      serialized = TimeSpanSerializer.serialize(time_span);
      deserialized = TimeSpanDeserializer.deserialize(serialized);
    });
    
    it("start should be the same", function(){
      expect(deserialized.start().isSame(time_span.start()));
    });
    
    it("end should be undefined", function(){
      expect(deserialized.end()).toBeUndefined();
    });

  });//END no end
  
});//END define
