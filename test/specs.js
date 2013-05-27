 
require.config({
  paths: {
    "moment": "../js/moment.min",
    "models/time_span": "../js/models/time_span",
    "services/time_span_service": "../js/services/time_span_service",
    "presenters/time_presenter": "../js/presenters/time_presenter",
    "util/util": "../js/util/util",
    "util/dom": "../js/util/dom",
    "util/dom-creator": "../js/util/dom-creator",
    "views/check_in_view": "../js/views/check_in_view",
    "views/status_view": "../js/views/status_view",
  }
});

var specs = [
  "specs/time_span_specs",
  "specs/services/time_span_service_specs",
  "specs/presenters/time_presenter_specs",
  "specs/views/check_in_view_specs",
  "specs/views/status_view_specs",
  "specs/util/dom_creator_specs",
];
require(specs,function(){
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  jasmineEnv.execute();
});