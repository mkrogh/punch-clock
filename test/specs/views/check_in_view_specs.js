
define(["util/dom-creator","services/time_span_service","views/check_in_view"], function(DomCreator, TimeSpanService, CheckInView){
  describe("CheckInView", function(){
    var $test, $check_in, $check_out, service, click_event;
    beforeEach(function(){
      service = TimeSpanService.create();
      click_event = new CustomEvent("click");

      $test = DomCreator(".controls");
      $check_in = DomCreator("a#check-in");
      $check_out = DomCreator("a#check-out");
      $test.appendChild($check_in);
      $test.appendChild($check_out);
    });

    describe("when clicking check-in", function(){
      it("adds a time_span to the service", function(){
        var view = CheckInView.create(service, $test);
        expect(service.count()).toEqual(0);

        $check_in.dispatchEvent(click_event);
        expect(service.count()).toEqual(1);
      });

    });//END click checkin
  });
});
