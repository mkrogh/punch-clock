define(["models/time_span", "moment"],function(TimeSpan, moment){
  describe("TimeSpan", function() {
    var span;

    beforeEach(function(){
      span = TimeSpan.create();
    });

    describe("when calculating duration", function(){
      describe("with no end set", function(){
        it("should use now for duration if end is missing", function(){
          expect(span.duration()).toBeDefined();
        });

        it("should increase over time", function(){
          var diff1 = span.duration();

          //wait for 2ms
          setTimeout(function(){ 
            var diff2 = span.duration();
            expect(diff1).not.toEqual(diff2);
          }, 2);
        });
      });//END end not set

      it("should use end value", function(){
        span.start(moment("2013-05-12 15:30:30", "YYYY-MM-DD HH:mm:ss"));
 
        span.end(moment("2013-05-12 15:30:40", "YYYY-MM-DD HH:mm:ss"));
        expect(span.duration().asMilliseconds()).toBe(10000);

      });
    });//END duration

    describe("#isCheckedOut", function(){
      it("should be false with no end", function(){
        expect(span.isCheckedOut()).toBe(false);
      });

      it("should change with checkouts", function(){
        expect(span.isCheckedOut()).toBe(false);
        span.checkOut();
        expect(span.isCheckedOut()).toBe(true);
      });
    });

    describe("when checking out", function(){
      it("should set the end", function(){
        expect(span.end()).toBeUndefined();
        span.checkOut();
        expect(span.end()).toBeDefined();
      }); 
    });//END checkout


    describe("#toString", function(){
      it("reports 2 hour 16 minutes as 2:16", function(){
        span.start(moment("2013-05-12 15:30:30", "YYYY-MM-DD HH:mm:ss"));
        span.end(moment("2013-05-12 17:46:40", "YYYY-MM-DD HH:mm:ss"));
        expect(span.toString()).toBe("2:16");
      });
    });//END toString

    describe("allows change tracking", function(){
      var reciver;
      beforeEach(function(){
        reciver = jasmine.createSpy("reciver");
      })
      it("allows you to add an observer", function(){
        span.trackChange(reciver);
      });

      it("notifies on start change", function(){
        span.trackChange(reciver);
        span.start(moment());
        expect(reciver).toHaveBeenCalled();
        expect(reciver).toHaveBeenCalledWith(span);
      });

      it("notifies on end change", function(){
        span.trackChange(reciver);
        span.checkOut();
        expect(reciver).toHaveBeenCalled();
        expect(reciver).toHaveBeenCalledWith(span);
      });
    });//END Change tracking

    describe("when serializing", function(){
      it("#toJSON", function(){
        expect(span.toJSON()).not.toBeUndefined();
      });
    });
  });//END describe TimeSpan
 
});
