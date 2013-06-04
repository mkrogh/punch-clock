define(["models/simple_storage"],function(SimpleStorage){
  describe("SimpleStorage", function(){
    var storage;
    beforeEach(function(){
      storage = SimpleStorage.create();
    });

    it("saves data", function(){
      storage.save("test", "fest");

      expect(storage.fetch("test")).toEqual("fest");
    });

    it("can store in local storage", function(){
      storage = SimpleStorage.create(window.localStorage);
      storage.save("test","fest");
      expect(storage.fetch("test")).toEqual("fest");
      expect(window.localStorage["test"]).toEqual("fest");
    });

    it("can reset data", function(){
      storage.save("test", "fest");
      storage.reset();
      expect(storage.fetch("test")).toBeUndefined();
    });

    
  });//END SimpleStorage
});//END define
