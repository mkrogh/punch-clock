
define(["util/dom-creator","services/time_span_service","views/status_view"], function(DomCreator,TimeSpanService, StatusView){
  describe("StatusView", function(){
    var $test, service;
    var view;
    beforeEach(function(){
      $test = DomCreator("div h2.punch-clock");
      service = TimeSpanService.create();
      view = StatusView.create(service, $test); 
    });

    it("updates status when adding time spans", function(){
      expect($test.textContent).toEqual("");
      service.addNew();
      expect($test.textContent).toContain("Check-in at");
    });

    it("updates status when removing all time spans", function(){
      service.addNew();
      service.addNew();
      expect($test.textContent).toContain("Check-in at");
      service.delete_all();
      expect($test.textContent).toEqual("");
    });

    it("updates status when checkin-out a time span", function(){
      service.addNew();
      service.last().checkOut();

      expect($test.textContent).toMatch(/\d{2}:\d{2} - \d{2}:\d{2} \(0:00\)/);
    });

    describe("on startup containing time span", function(){
      beforeEach(function(){
        service = TimeSpanService.create();
      });

      it("shows check-in text if checked in", function(){
        service.addNew();
        view = StatusView.create(service, $test); 
        expect($test.textContent).toContain("Check-in at");
      });

      it("shows last check-out if checked out", function(){
        service.addNew();
        service.last().checkOut();
        view = StatusView.create(service, $test); 
        expect($test.textContent).toMatch(/\d{2}:\d{2} - \d{2}:\d{2} \(0:00\)/);
      });
    });//END starts with one

    describe("when time passes", function(){
      beforeEach(function(){
        jasmine.Clock.useMock();
      });

      it("should update accordingly", function(){
        service.addNew();
        var before = $test.textContent;

        //Move start 3min back in time :D
        service.first().start().subtract(3, "minutes");

        jasmine.Clock.tick(30001);
        expect($test.textContent).not.toEqual(before);
      });

      it("should only track last added", function(){
        service.addNew();
        service.addNew();
        
        var before = $test.textContent;
        //Cheating
        service.first().start().subtract("10", "minutes");
        jasmine.Clock.tick(30001);

        expect($test.textContent).toEqual(before);
      });

      describe("after check-out", function(){
        it("should not update view", function(){
          service.addNew();
          service.first().checkOut();
          var before = $test.textContent;
          service.first().start().subtract("10", "minutes");
          jasmine.Clock.tick(30001);

          expect($test.textContent).toEqual(before);
        });

      });//END after checkout

      describe("after delete all", function(){
        it("should not update view", function(){
          service.addNew();
          service.first().start().subtract("10", "minutes");
          service.delete_all();
          jasmine.Clock.tick(30001);

          expect($test.textContent).toEqual("");

        });
      });//END after delete all
    });//END time passes
  });
});
