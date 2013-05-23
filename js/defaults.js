
(function(){
  var disable = document.querySelectorAll(".button")

  for(var i=0; i < disable.length; i++){
    disable[i].addEventListener("click", function(e){
      if(this.className.indexOf("disabled") !== -1){
        e.preventDefault();
      }
    });
  }
})();

require.config({
  paths: {
    "moment": "moment.min",
  }
});

require(["services/time_span_service","presenters/time_presenter", "views/check_in_view"], function(TimeSpanService, TimePresenter, CheckinView){
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
  service.addNew(); 
  service.addNew(); 
  service.first().start().subtract(1, "days");
  service.first().end(service.first().start().clone().add("hours",2));
  //Print it
  //printData(service);
  var checkin_view =  CheckinView.create(service);
});
