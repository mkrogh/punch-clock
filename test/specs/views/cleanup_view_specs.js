
define(["util/dom-creator","services/time_span_service","views/cleanup_view"], function(DomCreator, TimeSpanService, CleanupView){
  describe("CleanupView", function(){
    var $test, $cleanup, $title, service, click_event;
    var $view;
    beforeEach(function(){
      service = TimeSpanService.create();
      click_event = new CustomEvent("click");

      $test = DomCreator(".config");
      $cleanup = DomCreator("a#cleanup");
      $title = DomCreator("span.title");
      $title.textContent = "clean up";
      $cleanup.appendChild($title);
      $test.appendChild($cleanup);
    });


    describe("when clicking cleanup", function(){
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

    describe("when number of time spans in service change", function() {
      beforeEach(function(){
        $view = CleanupView.create(service, $test);
      });

      it("updates count in label when adding one", function(){
        expect($title.textContent).toEqual("clean up");
        service.addNew();
        expect($title.textContent).toEqual("clean up (1)");
      });

      it("updates count in label when adding two", function(){
        expect($title.textContent).toEqual("clean up");
        service.addNew();
        service.addNew();
        expect($title.textContent).toEqual("clean up (2)");
      });

      it("updates count in label when adding many", function(){
        expect($title.textContent).toEqual("clean up");
        for(var i = 0; i < 90; i++){
          service.addNew();
        }
        expect($title.textContent).toEqual("clean up (90)");
      });
    });//Adding timespans

    describe("on startup with saved time spans", function(){
      beforeEach(function(){
        service.addNew();
        $view = CleanupView.create(service, $test);
      });

      it("label is up to date", function(){
        expect($title.textContent).toEqual("clean up (1)");
      });
    });
  })//END cleanup
});
