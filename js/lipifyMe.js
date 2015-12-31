function LipifyMe () {
  var english;
  var nepali;
  var write;
  var lipify;

  var init = function() {
    write = new LipifyToView();

    english = write.createInputDiv();
    nepali = write.createOutputDiv();

    lipify = new LipifyModel();
  }

  this.on = function() {
    init();
  }
}

var lipi = new LipifyMe();
lipi.on();
