
define(["util/dom-creator","services/time_span_service","views/cleanup_view"], function(DomCreator, TimeSpanService, CleanupView){
  describe("CleanupView", function(){
    var $test, $check_in, $check_out, service, click_event;
    beforeEach(function(){
      service = TimeSpanService.create();
      click_event = new CustomEvent("click");

      $test = DomCreator(".controls");
      $cleanup = DomCreator("a#cleanup");
      $test.appendChild($cleanup);
    });


    describe("when clicking cleanup", function(){
      var $view;
      
      beforeEach(function(){
        $view = CleanupView.create(service, $test);
        service.addNew();
        service.addNew();
      });

      it("should delete all time spans", function(){
        expect(service.count()).toEqual(2);

        $cleanup.dispatchEvent(click_event);
        expect(service.count()).toEqual(0);
      });
    });//END on click
  })//END cleanup
});
