require.config({
  paths: {
    "moment": "moment.min",
  }
});

require(["services/time_span_service",
         "presenters/time_presenter", 
         "views/check_in_view",
         "views/status_view"], 
      function(
         TimeSpanService, 
         TimePresenter, 
         CheckinView,
         StatusView){
  var domNText = function(elm, text){
    var element = document.createElement(elm);
    var elementText = document.createTextNode(text);
    element.appendChild(elementText);
    return element;
  }

  var nbr = 1;
  var printLine = function(time_span){
    var tr = document.createElement("tr");
    var tds = [];

    tds.push(domNText("td", nbr++));
    tds.push(domNText("td", TimePresenter.present(time_span.start())));
    tds.push(domNText("td", TimePresenter.present(time_span.end())));
    tds.push(domNText("td", time_span));

    for(var i=0; i < tds.length; i++){
      tr.appendChild(tds[i]);
    }

    return tr;
  }
  var printData = function(service){
    var table = document.querySelector(".data .rows");
    var rows = service.all;
    for(var i=0; i < rows.length; i++){
      table.appendChild(printLine(rows[i]));
    }
  }
  var service = TimeSpanService.create();
  //Print it
  //printData(service);
  var status_view =  StatusView.create(service);
  var checkin_view =  CheckinView.create(service);
});
