require.config({
  paths: {
    "moment": "moment.min",
  }
});

require(["services/local_storage_time_span_service",
         "models/simple_storage", 
         "presenters/time_presenter", 
         "views/check_in_view",
         "views/cleanup_view",
         "views/status_view"], 
      function(
         TimeSpanService, 
         SimpleStorage, 
         TimePresenter, 
         CheckinView,
         CleanupView,
         StatusView){
  var storage = SimpleStorage.create(window.localStorage);
  var service = TimeSpanService.create(storage);
  //Print it
  //printData(service);
  var status_view =  StatusView.create(service);
  var cleanup_view =  CleanupView.create(service);
  var checkin_view =  CheckinView.create(service);
});
