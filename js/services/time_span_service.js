
define(["models/time_span"],function(time_span){
  return {
    /**
     * Creates a new TimeSpanService.
     */
    create: function(){
      var time_spans = [];

      /**
       * Gets the current number of elements in the serivce.
       * @returns {integer} The number of elements in the service.
       */
      var count = function(){
        return time_spans.length;
      }

      /**
       * Adds a TimeSpan to the service.
       * @param {TimeSpan} time_span The TimeSpan to add
       * @returns {integer} The new count of the service.
       */
      var add = function(time_span){
        var result = count();
        if(time_spans.indexOf(time_span) === -1){
          result =  time_spans.push(time_span);
        }
        return result;
      }  

      /**
       * Creates a new TimeSpan and adds it to the serivce.
       * @returns {integer} The number of elements in the service 
       */
      var addNew = function(){
        return add(time_span.create());
      }

      /**
       * Gets the first element in the service.
       * If no timespans are available in the service it returns undefined.
       * @returns {TimeSpan} The first TimeSpan.
       */ 
      var first = function(){
        return time_spans[0];
      }

      /**
       * Gets the last TimeSpan in the service.
       * If no timespans are available in the service it returns undefined.
       * @returns {TimeSpan} The last TimeSpan.
       */
      var last = function(){
        return time_spans[time_spans.length-1];
      }

      /**
       * Removes a specific TimeSpan from the service. 
       * @returns {TimeSpan} The TimeSpan that was removed.
       */
      var remove = function(span){
        var index = time_spans.indexOf(span);
        if( index > -1){
          return time_spans.splice(index, 1);
        }
      }
      
      return {
        all: time_spans,
        addNew: addNew,
        add: add,
        remove: remove,
        first: first,
        last: last,
        count: count
      }
    }//END create
  }//END return
});
