/*
 * Usage:
 * DomCreator("#test img.some-class")
 *   Creates a div with the id test
 *    containing an image with the class .some-class.
 *
 * It allows you to create simple dom structures quickly. 
 * Currently it only supports elements, classes and ids.
 *
 * The idea is somewhat inspired by http://en.wikipedia.org/wiki/Zen_Coding
 */
define(function(){
    var convert = function(list){
      var strElm = list.shift();
      strElm = strElm.trim();
      
      var divRegexp = /^(\.|#|div)/;
      var classesRegexp = /\.([^\.#]+)/g;
      var idRegexp = /#([^\.#]+)/;

      var domElm = null;
      var classes = [];
      var match;

      try {
        if(strElm.match(divRegexp)){
          domElm = document.createElement("div");
        }else{
          if(match = strElm.match(/^([^\.#]+)/)){
            domElm = document.createElement(match[1]);
          }
        }

        while(match = classesRegexp.exec(strElm)){
          if(classes.indexOf(match[1]) == -1){
            classes.push(match[1]);
          }
        }
        domElm.className = classes.join(" ");
        var id;
        if(id = idRegexp.exec(strElm)){
          domElm.id = id[1]; 
        }

      }catch (e){

      }
      return domElm;
    }


    var createElements = function(list, appendTo){
      var result;
      result = convert(list);

      if(appendTo){
        appendTo.appendChild(result);
      }
      
      if(list.length > 0){
        createElements(list, result);
      }
      return result;
    };

  //ACTUAL Function.
  return function(selectors, appendTo){
    var result;
    var strElms = selectors.split(" ");
    
    return createElements(strElms);
  }
});

