function LipifyMe () {
  var english;
  var nepali;
  var write;
  var lipify;

  var init = function() {
    write = new LipifyToView();

    english = write.createInputDiv();
    nepali = write.createAutocompleteDiv();

    lipify = new LipifyModel();
  }

  this.on = function() {
    init();
    transliteratorPredict();
  }

  var transliterator = function() {
    startTransliterate();
    listenForBackspaceAndDelete();
    listenForPaste();
  }

  var transliteratorPredict = function() {
    english.addEventListener('keyup', function(event){
      var currentLetter = String.fromCharCode(event.keyCode);
      var autoCompleteResult = lipify.predict(this.value, currentLetter);
      write.writeResult(autoCompleteResult);      
    });
  }

  var startTransliterate = function() {
    english.addEventListener('keypress', function(event){
      var letter = String.fromCharCode(event.charCode);
      var returnValue;

      if (event.currentTarget.selectionStart < english.value.length) {
        eigoFirst = english.value.substring(0, event.currentTarget.selectionStart);
        eigoSecond = english.value.substring(event.currentTarget.selectionStart, english.value.length);
        inputString = eigoFirst + letter + eigoSecond;
        returnValue = lipify.transliterateAtOnce(inputString);
      }
      else {
        var currentLetter = letter; // for cross checking
        var previousContent = nepali.value;

        var KeyID = event.keyCode;

        switch(KeyID) {
          case 13: // enter key
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
    english.addEventListener('keyup', function(event) {
      var returnValue;

      var KeyID = event.keyCode;
      switch(KeyID) {
        case 8:
        // backspace
        returnValue = lipify.deleteAfterBackspaceOrDelete();
        break;

        case 46:
        // delete key
        returnValue = lipify.deleteAfterBackspaceOrDelete();
        break;

        default:
        break;
      }

      if (returnValue) {
        write.writeNepali(returnValue);        
      }
      else if (returnValue == false){
        write.writeNepali('');
      }

    }, false);

  }

  var listenForPaste = function() {
    english.addEventListener('paste',function(event){
      var text = event.clipboardData.getData('text/plain');
      var nepaliValue = lipify.transliterateAtOnce(text);
      write.writeNepali(nepaliValue);
    });
  }
}

var lipi = new LipifyMe();
lipi.on();
