
define(["models/time_span","moment","serializers/time_span_serializer"], function(TimeSpan, moment, TimeSpanSerializer){
  describe("TimeSpanSerializer", function(){
    var time_span;
    beforeEach(function(){
      time_span = TimeSpan.create();
      var start = moment("2013-05-28 15:20");
      time_span.start(start);
    });

      describe("fully populated", function(){
        beforeEach(function(){
          time_span.end(time_span.start().clone().add(1, "days"));
        });
        it("produces valid json of complete time_span", function(){
          var json_output = TimeSpanSerializer.serialize(time_span);
          var object = JSON.parse(json_output);
          expect(object.time_span).toBeDefined();
        });

        it("formats time stamps correctly", function(){
          var json_output = TimeSpanSerializer.serialize(time_span);
          var object = JSON.parse(json_output);

          expect(object.time_span.start).toEqual("2013-05-28T13:20:00.000Z");
          expect(object.time_span.end).toEqual("2013-05-29T13:20:00.000Z");
        });
      });//END full

      describe("when serialing with only start", function(){
        it("produces valid json", function(){
          var json_output = TimeSpanSerializer.serialize(time_span);
          var object = JSON.parse(json_output);
          expect(object.time_span).toBeDefined();
        });

      });//END full
  });//END TimeSpanSerializer

});
