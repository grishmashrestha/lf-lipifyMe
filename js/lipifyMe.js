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
    transliterator();
  }

  var transliterator = function() {
    // startTransliterate();
    // listenForBackspaceAndDelete();
    listenForPaste();
  }

  var startTransliterate = function() {

  }

  var listenForBackspaceAndDelete = function() {

  }

  var listenForPaste = function() {
    english.addEventListener("paste",function(event){
      var text = event.clipboardData.getData("text/plain");
      var nepaliValue = lipify.transliterateAtOnce(text);
      write.writeNepali(nepaliValue);
    });
  }
}

var lipi = new LipifyMe();
lipi.on();
