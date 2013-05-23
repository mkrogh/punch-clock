 
require.config({
  paths: {
    "moment": "../js/moment.min",
    "models/time_span": "../js/models/time_span",
    "services/time_span_service": "../js/services/time_span_service",
    "presenters/time_presenter": "../js/presenters/time_presenter",
    "util/util": "../js/util/util",
    "util/dom": "../js/util/dom"
  }
});

var specs = [
  "specs/time_span_specs",
  "specs/services/time_span_service_specs",
  "specs/presenters/time_presenter_specs",
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
