define(["moment", "models/time_span","presenters/duration_presenter"], function(moment, TimeSpan, DurationPresenter){
    var create_duration = function(start, end){
        var span = TimeSpan.create();
        span.start(moment(start, "YYYY-MM-DD HH:mm:ss"));
        span.end(moment(end, "YYYY-MM-DD HH:mm:ss"));
        return span.duration();
    }

    describe("DurationPresenter", function(){
      var duration;
      it("reports 1 hour as 1:00", function(){
        var duration = create_duration("2013-05-12 15:30:30", "2013-05-12 16:30:30");
        expect(DurationPresenter.present(duration)).toBe("1:00");
      });

      it("reports 2 hour 16 minutes as 2:16", function(){
        duration = create_duration("2013-05-12 15:30:30", "2013-05-12 17:46:40");
        expect(DurationPresenter.present(duration)).toBe("2:16");
      });

      it("reports time spanning multiple days correctly", function(){
        duration = create_duration("2013-05-12 15:30:30", "2013-05-13 17:46:40");
        
        expect(DurationPresenter.present(duration)).toBe("1d 2:16");
      });
    });//END toString
});
