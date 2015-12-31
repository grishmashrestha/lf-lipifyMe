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
    startTransliterate();
    // listenForBackspaceAndDelete();
    listenForPaste();
  }

  var startTransliterate = function() {
    english.addEventListener("keypress", function(event){
      var letter = String.fromCharCode(event.charCode);

      if (event.currentTarget.selectionStart < english.value.length) {
        eigoFirst = english.value.substring(0, event.currentTarget.selectionStart);
        eigoSecond = english.value.substring(event.currentTarget.selectionStart, english.value.length);
        inputString = eigoFirst + letter + eigoSecond;
        lipify.transliterateAtOnce(inputString);
      }
      else {
        var currentLetter = letter; // for cross checking
        var previousContent = nepali.value;
        var returnValue;

        var KeyID = event.keyCode;


        switch(KeyID) {
          case 13:
          // enter
          returnValue = lipify.completeLetterIfNotComplete(letter);
          break;

          default:
          returnValue = lipify.transliterate(letter, currentLetter, previousContent, returnValue);
          break;
        }
      }
      if (returnValue) {
        write.writeNepali(returnValue);        
      }
    }, false);

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
