function LipiTransliterate () {
  var vowels = {
    "a":"अ",
    "aa":"आ",
    "i":"इ",
    "ii":"ई",
    "u":"उ",
    "oo":"ऊ",
    "e":"ए",
    "ai":"ऐ",
    "o":"ओ",
    "au":"औ",
    "am":"अं",
    "om":"ॐ",
    "aum":"ॐ",
    "rr":"र्‍",
    "rri":"ऋ",
    "rree":"ॠ",
    "*":"ं",
    "**":"ँ"
  };

  var numerals = {
    "0":"०",
    "1":"१",
    "2":"२",
    "3":"३",
    "4":"४",
    "5":"५",
    "6":"६",
    "7":"७",
    "8":"८",
    "9":"९",
    ".":"।"
  }

  var consonants = {
    "ka":"क",
    "qa":"क",
    "ca":"क",
    "kha":"ख",
    "ga":"ग",
    "gha":"घ",
    "nga":"ङ",
    "cha":"च",
    "chha":"छ",
    "ja":"ज",
    "za":"ज",
    "jha":"झ",
    "yna":"ञ",
    "Ta":"ट",
    "Tha":"ठ",
    "Da":"ड",
    "Dha":"ढ",
    "Na":"ण",
    "ta":"त",
    "tha":"थ",
    "da":"द",
    "dha":"ध",
    "na":"न",
    "pa":"प",
    "pha":"फ",
    "fa":"फ",
    "ba":"ब",
    "bha":"भ",
    "ma":"म",
    "ya":"य",
    "ra":"र",
    "la":"ल",
    "va":"व",
    "wa":"व",
    "sha":"श",
    "Sha":"ष",
    "sa":"स",
    "ha":"ह",
    "ksha":"क्ष",
    "xa":"क्ष",
    "tra":"त्र",
    "gyna":"ज्ञ"
  };

  var consonants2 = {
    "k":"क",
    "q":"क",
    "c":"क",
    "kh":"ख",
    "g":"ग",
    "gh":"घ",
    "ng":"ङ",
    "ch":"च",
    "chh":"छ",
    "j":"ज",
    "z":"ज",
    "jh":"झ",
    "yn":"ञ",
    "T":"ट",
    "Th":"ठ",
    "D":"ड",
    "Dh":"ढ",
    "N":"ण",
    "t":"त",
    "th":"थ",
    "d":"द",
    "dh":"ध",
    "n":"न",
    "p":"प",
    "ph":"फ",
    "f":"फ",
    "b":"ब",
    "bh":"भ",
    "m":"म",
    "y":"य",
    "r":"र",
    "l":"ल",
    "v":"व",
    "w":"व",
    "sh":"श",
    "Sh":"ष",
    "s":"स",
    "h":"ह",
    "ksh":"क्ष",
    "x":"क्ष",
    "tr":"त्र",
    "gyn":"ज्ञ"
  };
  
  var diacriticals = {
    "aa":"ा",
    "i":"ि",
    "ii":"ी",
    "ee":"ी",
    "u":"ु",
    "oo":"ू",
    "e":"े",
    "ai":"ै",
    "o":"ो",
    "au":"ौ",
    "*":"ं",
    "a*":"ं",
    "**":"ँ",
    "raa":"्रा",
    "ra":"्र",
    "a**":"ँ",
    "\\":"्",
    "a\\":"्"
  };

  var space = {
    ' ' : ' '
  };


  var undetermined;
  var previousLast;
  var previousLetter;

  var english = document.getElementsByClassName('transliterateThis')[0];
  var nepali = document.getElementsByClassName('nepali')[0];

  this.init = function() {
    startTransliterate();
    listenForBackspace();
  }

  var startTransliterate = function() {
    english.addEventListener("keypress", function(){
      var letter = String.fromCharCode(event.keyCode);
      var currentLetter = letter;

    });
  }

  var listenForBackspace = function() {
    english.addEventListener("keydown", function(){
      var letter = String.fromCharCode(event.keyCode);
      var KeyID = event.keyCode;
      switch(KeyID)
      {
        case 8:
        debugger;
        break; 
        case 46:
        alert("delete");
        break;
        default:
        break;
      }
    });
  }

  var writeNepali = function(val) {
    nepali.value = val;
  }

  var isVowel = function(letter) {
    vowels[letter];
  }
}
