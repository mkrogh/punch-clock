define(["models/time_span"],function(TimeSpan){
  return {
    test:
    function(TimeSpanService){
      var service;
      beforeEach(function(){
        service = TimeSpanService.create();
      });

      it("creates new time spans", function(){
        var size = service.addNew();
        expect(service.count()).toBe(size);
        expect(service.first()).toBeDefined();
      });

      describe("when populated", function(){
        var first = TimeSpan.create();
        var last = TimeSpan.create();
        beforeEach(function(){
          //Add two timespans
          service.add(first);
          service.add(last);
        });

        it("count gives the number of elements", function(){
          expect(service.count()).toBe(2);
        });

        it("first gets first element",function(){
          expect(service.first()).toBe(first);
        });

        it("last gets the last element", function(){
          expect(service.last()).not.toBe(first)
          expect(service.last()).toBe(last)
        });
        
        it("does not add the same time span multilpe times", function(){
          var count = service.count();
          var add = service.add(first);
          expect(service.count()).toBe(count);
          expect(add).toBe(count);
        });
        
        it("removes an element", function(){
          var before = service.all.length;
          var removed = service.remove(first);
          expect(service.count()).toBe(before-1);
          expect(removed[0]).toBe(first);
        });

        it("does not remove the same element twice", function(){
          service.remove(first);
          var result = service.remove(first);

          expect(result).toBeUndefined();
        });

        describe("with only one element", function(){
          beforeEach(function(){
            service.all.pop();
          });

          it("first and last should be the same", function(){
            expect(service.first()).toBe(service.last());
          });
        }); //END one element
      });//END populated

        describe("when empty", function(){
          it("first returns undefined", function(){
            expect(service.first()).toBeUndefined();
          });

          it("last returns undefined", function(){
            expect(service.last()).toBeUndefined();
          });
        });//END empty
    }//END test
  };
});
