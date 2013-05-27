define(["util/dom-creator"], function(DomCreator){
  describe("DomCreator",function(){

    describe("when parsing css classes", function(){

      it("can adds single class", function(){
        var div = DomCreator("div.test");
        expect(div.tagName).toEqual("DIV");
        expect(div.className).toEqual("test");
      });

      it("handles multiple classes", function(){
        var div = DomCreator("div.test.fest.hest");
        expect(div.className).toEqual("test fest hest");
      });

      it("only adds a class once", function(){
        var div = DomCreator("div.test.test");
        expect(div.className).toEqual("test");
      });
    });//END parsinc css

    describe("when parsing ID", function(){

      it("adds an ID if specified", function(){
        var div = DomCreator("div#test");
        expect(div.id).toEqual("test");
      });
      
      it("ignores additional ids", function(){
        var div = DomCreator("div#test#hest");
        expect(div.id).toEqual("test");
        
      });
    });//END id

    describe("when parsing divs", function(){
      it("can create a div", function(){
        var div = DomCreator("div");
        expect(div.tagName).toEqual("DIV");
      });
  
      it("parses .test into div.test", function(){
        var div = DomCreator(".test");
        expect(div.tagName).toEqual("DIV");
        expect(div.className).toEqual("test");
      });
    });//END div


    describe("when parsing html elements", function(){
      it("can parse a p", function(){
        expect(DomCreator("p").tagName).toEqual("P");
      });
      it("can parse a table", function(){
        expect(DomCreator("table").tagName).toEqual("TABLE");
      });
    });//END html

    describe("when parsing garbage", function(){
      it("'$fisk' yields null", function(){
        expect(DomCreator("$fisk")).toBeNull();
      });

      it("'test' yields test element", function(){
        expect(DomCreator("test").tagName).toEqual("TEST");
      });
    });//END garbage


    describe("when parsing nested", function(){
      it("nests elements properly", function(){
        var root = DomCreator("div p img");
        expect(root.tagName).toEqual("DIV");
        expect(root.firstChild.tagName).toEqual("P");
        expect(root.firstChild.firstChild.tagName).toEqual("IMG");
      });

      it("handles complex nesting", function(){
        var root = DomCreator(".test #hest.pop p.fest.best");
        var first = root.firstChild;
        var second = first.firstChild;
        expect(root.tagName).toEqual("DIV");
        expect(root.className).toEqual("test");

        expect(first.tagName).toEqual("DIV");
        expect(first.className).toEqual("pop");
        expect(first.id).toEqual("hest");

        expect(second.tagName).toEqual("P");
        expect(second.className).toEqual("fest best");
      });
    });//END nested
  });//END DomCreator
});
