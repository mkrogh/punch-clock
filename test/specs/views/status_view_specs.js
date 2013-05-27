
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

    it("updates status when checkin-out a time span", function(){
      service.addNew();
      service.last().checkOut();

      expect($test.textContent).toMatch(/\d{2}:\d{2} - \d{2}:\d{2} \(0:00\)/);
    });

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
    });//END time passes
  });
});
