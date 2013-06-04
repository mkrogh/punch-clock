
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

    describe("on startup containing active time span", function(){
      beforeEach(function(){
        service = TimeSpanService.create();
        service.addNew();
        view = CheckInView.create(service, $test); 
      });

      it("check out button should be actvive", function(){
        expect($check_in.className).toContain("hidden");
        expect($check_out.className).not.toContain("hidden");
      });
    });//END starts with one

    describe("when clicking check-in", function(){
      var view;
      
      beforeEach(function(){
        view = CheckInView.create(service, $test);
      });

      it("adds a time_span to the service", function(){
        expect(service.count()).toEqual(0);

        $check_in.dispatchEvent(click_event);
        expect(service.count()).toEqual(1);
      });

      it("adds a time span each time", function(){
        $check_in.dispatchEvent(click_event);
        $check_in.dispatchEvent(click_event);
        $check_in.dispatchEvent(click_event);
        expect(service.count()).toEqual(3);
        
      });

    });//END click checkin

    describe("when clicking check-out after check-in", function(){
      var view;
      
      beforeEach(function(){
        view = CheckInView.create(service, $test);
        $check_in.dispatchEvent(click_event);
      });

      it("sets the end of the checked-in time_span", function(){
        expect(service.count()).toEqual(1);
        expect(service.last().end()).not.toBeDefined();

        $check_out.dispatchEvent(click_event);
        expect(service.count()).toEqual(1);
        expect(service.last().end()).toBeDefined();
      });

      it("sets the end of the last time_span added", function(){
        $check_in.dispatchEvent(click_event);
        expect(service.count()).toEqual(2);

        expect(service.first().end()).not.toBeDefined();
        $check_out.dispatchEvent(click_event);
       
        //Should be unchaged 
        expect(service.first().end()).not.toBeDefined();
        //Should be set
        expect(service.last().end()).toBeDefined();
      });

    });//END click checkin
  });
});
