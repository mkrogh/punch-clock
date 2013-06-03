
define(["services/local_storage_time_span_service","specs/services/acts_like_time_span_service"], function(LocalStorageTimeSpanService, ActsLikeTimeSpanService){

  describe("LocalStorageTimeSpanService", function(){
    ActsLikeTimeSpanService.test(LocalStorageTimeSpanService);
  });//END LocalStorageTimeSpanService

});//END define
