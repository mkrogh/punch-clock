
define(["moment", "presenters/time_presenter"], function(moment, TimePresenter){
  var compare_to = moment("2013-05-24");
  describe("TimePresenter", function(){
    describe("when presenting same day", function(){
    var time = moment(); 
        time.hour(16);
        time.minute(5);
      it("shows only time", function(){
        expect(TimePresenter.present(time)).toBe("16:05");
      });
    });//End same day

    describe("when presenting same week", function(){
      it("shows day and time", function(){
        var time = moment("2013-05-22 16:05");
       expect(TimePresenter.present(time,compare_to)).toBe("Wed 16:05");
      });
    });//End same year

    describe("when presenting same year", function(){
      it("shows date and time", function(){
       var time = moment("2013-05-14 16:05");
       expect(TimePresenter.present(time, compare_to)).toBe("14/05 16:05");
      });
    });//End same year

    describe("when presenting undefined", function(){
      it("returns empty", function(){
        var test;
        expect(TimePresenter.present(test)).toBe("")
      });
    });//End other

    describe("when presenting other", function(){
      it("shows full date and time", function(){
        var time = moment("1986-05-16 07:00");
        expect(TimePresenter.present(time)).toBe("16/05-1986 07:00")
      });
    });//End other
  });//End TimePresenter
});//End define
