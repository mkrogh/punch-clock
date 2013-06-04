
define(["services/local_storage_time_span_service","models/simple_storage","specs/services/acts_like_time_span_service","moment"], function(LocalStorageTimeSpanService, SimpleStorage, ActsLikeTimeSpanService, moment){

  describe("LocalStorageTimeSpanService", function(){
    ActsLikeTimeSpanService.test(LocalStorageTimeSpanService);
    
    var storage;
    beforeEach(function(){
      storage = SimpleStorage.create();
    });

    describe("when changes", function(){
      var service;
      beforeEach(function(){
        service = LocalStorageTimeSpanService.create(storage);
      });
      
      it("tracks adding", function(){
        expect(storage.fetch("time_spans")).toBeUndefined();
        service.addNew();
        expect(storage.fetch("time_spans")).toBeDefined();
      });
      
      it("tracks check_outs", function(){
        service.addNew();
        var before = storage.fetch("time_spans");
        service.first().checkOut();
        expect(storage.fetch("time_spans")).not.toEqual(before);
      });

      it("tracks start", function(){
        service.addNew();
        var other_start = moment("2013-06-04");
        var before = storage.fetch("time_spans");

        service.first().start(other_start);

        expect(storage.fetch("time_spans")).not.toEqual(before);
      });

      it("tracks end", function(){
        service.addNew();
        var end = moment("2013-06-04");
        var before = storage.fetch("time_spans");

        service.first().end(end);

        expect(storage.fetch("time_spans")).not.toEqual(before);
      });
    });//END changes


    describe("when importing from storage", function(){
      var service;
      beforeEach(function(){
        var pre_service = LocalStorageTimeSpanService.create(storage);
        pre_service.addNew();
        pre_service.addNew();
        service = LocalStorageTimeSpanService.create(storage);
      });

      it("contains two time spans", function(){
        expect(service.count()).toBe(2);
      });

      it("tracks changes for older time spans", function(){
        var before = storage.fetch("time_spans");
        service.last().checkOut();
        expect(storage.fetch("time_spans")).not.toEqual(before);
      });
    });//END import from storage
  });//END LocalStorageTimeSpanService

});//END define
