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
    "rri":"ऋ",
    "rre":"ॠ",
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
    "a\\":"्",
    "rri":"ृ",
    "rre":"ॄ",
    "ah":" ः"
  };

  var space = {
    ' ' : ' '
  };

  var undetermined;
  var previousLetter;
  var previousLastLetter;
  var halfLetterWithR;
  var rCount=0;

  var english = document.getElementsByClassName('transliterateThis')[0];
  var nepali = document.getElementsByClassName('nepali')[0];

  this.init = function() {
    startTransliterate();
    listenForBackspace();
  }

  var startTransliterate = function() {
    english.addEventListener("keypress", function(){
      var letter = String.fromCharCode(event.keyCode);
      var currentLetter = letter; // for cross checking
      var previousContent = nepali.value;
      var returnValue;

      if (undetermined) {
        if (isVowel(currentLetter)) {
          if ((halfLetterWithR) && (currentLetter == 'i') && (previousLastLetter == 'r') && (rCount == 2)) {
            var letter = halfLetterWithR.substring(0, 1);
            returnValue = letter + diacriticals['rri'];
            previousContent = previousContent.substring(0, (previousContent.length - halfLetterWithR.length));
            writeNepali(previousContent + returnValue);
            previousLetter = returnValue;
            previousLastLetter = currentLetter;
            undetermined ='';
            halfLetterWithR = '';
            rCount = 0;
          }
          else if ((halfLetterWithR) && (currentLetter == 'e') && (previousLastLetter == 'r') && (rCount == 2)) {
            var letter = halfLetterWithR.substring(0, 1);  
            returnValue = letter + diacriticals['rre'];
            previousContent = previousContent.substring(0, (previousContent.length - halfLetterWithR.length));
            writeNepali(previousContent + returnValue);
            previousLetter = returnValue;
            previousLastLetter = currentLetter;
            undetermined ='';
            halfLetterWithR = '';
            rCount = 0;
          }
          else if (((currentLetter == 'i') || (currentLetter == 'e')) && (previousLetter == 'rr') && (rCount == 1)) { // for rri and rre
            letter = previousLetter + currentLetter;
            returnValue = vowels[letter];
            writeNepali(previousContent + returnValue);
            previousLetter = letter;
            previousLastLetter = currentLetter;
            undetermined ='';
            rCount = 0;
          }
          else {
            letter = undetermined + currentLetter;
            if (currentLetter == 'a') {
              returnValue = consonants[letter];
            }
            else {
              returnValue = consonants2[undetermined] + diacriticals[currentLetter];            
            }

            writeNepali(previousContent + returnValue);
            previousLetter = letter;
            previousLastLetter = currentLetter;
            undetermined ='';
          }
        }
        else if (isSpace(currentLetter)) {
          // for space, complete the letter
          letter = undetermined;
          returnValue = consonants2[letter];
          if (returnValue) {
            writeNepali(previousContent + returnValue + currentLetter);
            previousLetter = letter;
            previousLastLetter = currentLetter;
            undetermined ='';
          }
          else {
            undetermined = undetermined + currentLetter;
            previousLetter = undetermined;
            previousLastLetter = currentLetter;
            // do nothing for now.. do not display anything
          }
        }
        else {
          if ((['h', 'g', 's', 'r', 'y'].indexOf(currentLetter) > -1) && (previousLastLetter != currentLetter)) {
            undetermined = undetermined + currentLetter;
            if (consonants2[undetermined]) { // if undetermined + currentLetter combo will generate a full letter on next iteration
              previousLetter = undetermined;
              previousLastLetter = currentLetter;
            }
            else { // if undetermined + currentLetter do not form a letter on next iteration such as g+r unlike ch+h
              if (currentLetter == 'r') {
                var halfLetter = previousLetter;
                returnValue = consonants2[halfLetter] + diacriticals['\\'];
                if (returnValue) {
                  writeNepali(previousContent + returnValue);
                  rCount=1;
                  halfLetterWithR = returnValue;                   
                  undetermined = currentLetter;
                  previousLastLetter = currentLetter;
                  previousLetter = currentLetter;
                }
                else {
                  undetermined = undetermined;
                }
              }
              else {
                undetermined = previousLetter + currentLetter;
                previousLastLetter = currentLetter;
                previousLetter = undetermined;
              }
            } 
          }
          else if ((['h', 'g', 's', 'r', 'y'].indexOf(currentLetter) > -1) && (previousLastLetter == currentLetter) && (currentLetter == 'h')) {
            // for chh 
            undetermined = undetermined + currentLetter;
            previousLetter = undetermined;
            previousLastLetter = currentLetter;

          }
          else {
            if ((currentLetter == previousLastLetter) && (currentLetter == 'r')) {
              undetermined = previousLastLetter + currentLetter;
              previousLastLetter = currentLetter;
              previousLetter = undetermined;
              rCount+=1;
              halfLetterWithR = halfLetterWithR; // keep it same
            }
            else {
              var halfLetter = undetermined;
              returnValue = consonants2[halfLetter] + diacriticals['\\'];
              if (returnValue && consonants2[halfLetter]) {
                var isNumOrSpace =  numerals[currentLetter] || space[currentLetter];
                if (isNumOrSpace) {
                  returnValue = returnValue + isNumOrSpace;
                  undetermined = '';
                }
                else {
                  undetermined = currentLetter;                  
                }
                writeNepali(previousContent + returnValue);
                previousLastLetter = currentLetter;
                previousLetter = currentLetter;
              }
              else {
                undetermined = undetermined + currentLetter;
                previousLastLetter = currentLetter;
                previousLetter = currentLetter;
              }
              halfLetterWithR = '';              
            }
          }
        }
      }
      else {
        if (isVowel(currentLetter)) {
          if (isVowel(previousLastLetter)) {
            letter = previousLastLetter + currentLetter;
            var diacriti = diacriticals[letter];
            if (diacriti) {
              if (['a', 'i', 'o'].indexOf(previousLastLetter) > -1) {
                var newLetter = letter;
                if (['a', 'i', 'o'].indexOf(previousLetter) > -1) {
                  returnValue = vowels[newLetter];                  
                }
                else {
                  var newLetter = previousLetter.substring(0, previousLetter.length-1);
                  returnValue = consonants2[newLetter] + diacriti;
                }
              }
              else {

                if (previousLetter == previousLastLetter && currentLetter == previousLastLetter && currentLetter == 'e') { //for ee -> एए
                  returnValue = vowels[previousLastLetter] + vowels[currentLetter];
                  letter = currentLetter;

                }
                else {
                  var newLetter = previousLetter.substring(0, previousLetter.length-1);
                  returnValue = consonants2[newLetter] + diacriti;
                }                         
              }
              if (previousLastLetter == 'a') {
                if (previousLetter == previousLastLetter) {
                  previousLetterLength = previousLetter.length; //for kaa
                }
                else {
                  previousLetterLength = 1; //for ka
                }
              }
              else {
                if (['i', 'o'].indexOf(previousLastLetter) > -1) {
                  if ((previousLastLetter == previousLetter) && (previousLetter == 'o')) {
                    previousLetterLength = 1; // for 'oo' -> ऊ
                  }
                  else if ((previousLastLetter == previousLetter) && (previousLetter == 'i')) {
                    previousLetterLength = 1; // for 'ii' -> ई
                  }
                  else {
                    previousLetterLength = returnValue.length;                    
                  }
                }
                else {
                  previousLetterLength = previousLetter.length;                  
                }

              }
              previousContent = previousContent.substring(0, (previousContent.length-previousLetterLength));
              writeNepali(previousContent + returnValue);
              undetermined = '';
              previousLetter = letter;
              previousLastLetter = '';
            }
            else {
              if (previousLetter == previousLastLetter && currentLetter == previousLastLetter && currentLetter == 'u') { //for uu -> उउ
                returnValue = vowels[currentLetter];
                letter = currentLetter;
                writeNepali(previousContent + returnValue);
                undetermined = '';
                previousLetter = letter;
                previousLastLetter = currentLetter;
              }
              else if (previousLastLetter != currentLetter) {
                // for occurrences such as oe, uo, ae, ea, etc where combination of two vowels do not form any diacriticals
                returnValue = vowels[currentLetter];
                letter = currentLetter;
                writeNepali(previousContent + returnValue);
                undetermined = '';
                previousLetter = letter;
                previousLastLetter = currentLetter;
              }
              else {
                returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
                if (returnValue) {
                  writeNepali(previousContent + returnValue);
                  undetermined = '';
                  previousLetter = letter;
                  previousLastLetter = currentLetter;
                }
                else {
                  undetermined = letter;
                }
              }
            }
          }
          else {
            returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
            if (returnValue) {
              writeNepali(previousContent + returnValue);
              undetermined = '';
              previousLetter = letter;
              previousLastLetter = currentLetter;
            }
            else {
              undetermined = letter;
            }           
          }
        }
        else {
          returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
          if (returnValue) {
            writeNepali(previousContent + returnValue);
            undetermined = '';
            previousLetter = letter;
            previousLastLetter = currentLetter;
          }
          else {
            undetermined = letter;
            previousLastLetter = currentLetter;
            previousLetter = currentLetter;
          }           
        }
      }
    });
  }

  var listenForBackspace = function() {
    english.addEventListener("keydown", function(){
      var letter = String.fromCharCode(event.keyCode);
      var KeyID = event.keyCode;
      switch(KeyID)
      {
        case 8:

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
    return vowels[letter];
  }

  var isConsonant = function(letter) {
    return consonants[letter];
  }

  var isConsonant2 = function(letter) {
    return consonants2[letter];
  }

  var isSpace = function(letter) {
    return space[letter];
  }

}