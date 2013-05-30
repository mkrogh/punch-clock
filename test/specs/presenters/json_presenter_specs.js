
define(["models/time_span","moment","serializers/time_span_serializer"], function(TimeSpan, moment, JsonSerializer){
  describe("TimeSpanSerializer", function(){
    var time_span;
    beforeEach(function(){
      time_span = TimeSpan.create();
      var start = moment("2013-05-28 15:20");
      time_span.start(start);
      time_span.end(start.clone().add(1, "days"));
    });

    describe("when serializing", function(){

      describe("fully populated", function(){
        it("produces valid json of complete time_span", function(){
          var json_output = JsonSerializer.serialize(time_span);
          var object = JSON.parse(json_output);
          expect(object.time_span).toBeDefined();
        });

        it("formats time stamps correctly", function(){
          var json_output = JsonSerializer.serialize(time_span);
          var object = JSON.parse(json_output);

          expect(object.time_span.start).toEqual("2013-05-28T15:20:00.000Z");
          expect(object.time_span.end).toEqual("2013-05-29T15:20:00.000Z");
        });
      });//END complete
    });//END serialie

      describe("when deserializng", function(){
        describe("a serialized time span", function(){
          var deserialized;
          beforeEach(function(){
            var serialized;
            time_span = TimeSpan.create();
            time_span.checkOut();
            serialized = JsonSerializer.serialize(time_span);
            deserialized = JsonSerializer.deserialize(serialized);
          });
          
          it("start should be the same", function(){
            expect(deserialized.start()).toEqual(time_span.start());
          });
          
          it("end should be the same", function(){
            expect(deserialized.end()).toEqual(time_span.end());
          });

        });//END serialized
      });//END deserializing
  });//END TimeSpanSerializer

});
