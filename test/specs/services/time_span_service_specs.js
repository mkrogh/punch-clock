define(["services/time_span_service","specs/services/acts_like_time_span_service"], function(TimeSpanService, ActsLikeTimeSpanService){

  describe("TimeSpanService", function(){
    ActsLikeTimeSpanService.test(TimeSpanService);
  });//END TimeSpanService

});//END define
