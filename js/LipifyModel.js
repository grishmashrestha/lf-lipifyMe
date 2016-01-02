function LipifyModel () {
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
    "**":"ँ",
    ":":"ः"
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
    "**":"ँ",
    "raa":"्रा",
    "ra":"्र",
    "a**":"ँ",
    "\\":"्",
    "rri":"ृ",
    "rre":"ॄ",
    ":":" ः"
  };

  var space = {
    ' ' : ' '
  };

  var undetermined;
  var previousLetter;
  var previousLastLetter;
  var halfLetterWithR;
  var rCount=0;
  var previousContentForAtOnce;

  var english = document.getElementById('transliterateThis');
  var nepali = document.getElementById('nepali');

  this.transliterate = function(letterVal, currentLetterVal, previousContentVal, returnValueVal) {
    var letter = letterVal;
    var currentLetter = currentLetterVal;
    var previousContent = previousContentVal;
    var returnValue = returnValueVal;

    if (undetermined) {
      returnValue = transliterateForUndeterminedLetter(letter, currentLetter, previousContentForAtOnce, returnValue);
    }
    else {
      returnValue = transliterateForNewLetter(letter, currentLetter, previousContentForAtOnce, returnValue);
    }
    if (returnValue) {
      return returnValue      
    }
  }

  var transliterate = this.transliterate;

  var transliterateForUndeterminedLetter = function(letterVal, currentLetterVal, previousContentVal, returnValueVal) {
    var letter = letterVal;
    var currentLetter = currentLetterVal;
    var previousContent = previousContentVal || '';
    var returnValue = returnValueVal;
    if ((halfLetterWithR) && rCount == 1 && currentLetter != 'r') {
      rCount = 0;
    }

    if (isVowel(currentLetter)) {
      var isGyn = undetermined.search('gyn'); // check and return position of 'gyn' in an undetermined letter

      if ((halfLetterWithR) && (currentLetter == 'i') && (previousLastLetter == 'r') && (rCount == 2)) {
        var letter = halfLetterWithR.substring(0, 1);
        returnValue = letter + diacriticals['rri'];
        previousContent = previousContent.substring(0, (previousContent.length - halfLetterWithR.length));
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', returnValue, currentLetter, '');
        rCount = 0;
      }
      else if ((halfLetterWithR) && (currentLetter == 'e') && (previousLastLetter == 'r') && (rCount == 2)) {
        var letter = halfLetterWithR.substring(0, 1);  
        returnValue = letter + diacriticals['rre'];
        previousContent = previousContent.substring(0, (previousContent.length - halfLetterWithR.length));
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', returnValue, currentLetter, '');
        rCount = 0;
      }
      else if (halfLetterWithR  && (previousLastLetter == 'r') && (rCount == 2)) {
        if (currentLetter == 'a') {
          returnValue = consonants[previousLastLetter + currentLetter];
        }
        else {
          returnValue = consonants2[previousLastLetter] + diacriticals[currentLetter];
        }

        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', returnValue, currentLetter, '');
        rCount = 0;
      }
      else if (((currentLetter == 'i') || (currentLetter == 'e')) && (previousLetter == 'rr') && (rCount == 1)) { // for rri and rre
        letter = previousLetter + currentLetter;
        returnValue = vowels[letter];
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', letter, currentLetter);
        rCount = 0;
      }
      else if (isGyn > -1) {
        // if gyn is present 
        var firstHalfLetterGyn = undetermined.substring(0, isGyn);
        var prevLetterNep;
        if (firstHalfLetterGyn) {
          prevLetterNep = consonants2[firstHalfLetterGyn] +  diacriticals['\\'];
        }
        else {
          prevLetterNep = '';
        }
        if (currentLetter == 'a') {
          returnValue = prevLetterNep + consonants['gyna'];
        }
        else {
          returnValue = prevLetterNep + consonants2['gyn'] + diacriticals[currentLetter];
        }
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', (undetermined + currentLetter), currentLetter);
      }
      else {
        letter = undetermined + currentLetter;
        if (currentLetter == 'a') {
          if (consonants[letter]) {
            returnValue = consonants[letter];                
          }
          else {
            var firstHalfLetterYPos = undetermined.search('y');
            var firstHalfLetterY = undetermined.substring(0, firstHalfLetterYPos);
            
            if (consonants2[firstHalfLetterY]) {
              returnValue = consonants2[firstHalfLetterY] + diacriticals['\\'] + consonants[previousLastLetter + currentLetter];
              letter = previousLastLetter + currentLetter;
            }
            else {
              if (consonants2[previousLastLetter]) {
                undetermined = undetermined.substring(0, undetermined.length-1);
                returnValue = undetermined + consonants[previousLastLetter + currentLetter];                    
                letter = previousLastLetter + currentLetter;
              }
              else {
                returnValue = undetermined + vowels[currentLetter];
                letter = currentLetter;
              }
            }
          }
        }
        else {
          if (consonants2[undetermined]) {
            returnValue = consonants2[undetermined] + diacriticals[currentLetter];                            
          }
          else {
            letter = undetermined + currentLetter;
            returnValue = letter;
          }
        }
        previousContentForAtOnce = (previousContent) + returnValue;
        setLetterInfo('', letter, currentLetter);
      }
    }
    else if (isSpace(currentLetter)) {
      // for space, complete the letter
      letter = undetermined;
      returnValue = consonants2[letter];
      if (returnValue) {
        previousContentForAtOnce = previousContent + returnValue + currentLetter;
        setLetterInfo('', letter, currentLetter);
      }
      else {
        var isGyn = undetermined.search('gyn'); // check and return position of 'gyn' in an undetermined letter
        if (isGyn > -1) {
          // if gyn is present 
          var firstHalfLetterGyn = undetermined.substring(0, isGyn);
          var prevLetterNep;
          if (firstHalfLetterGyn) {
            prevLetterNep = consonants2[firstHalfLetterGyn] +  diacriticals['\\'];
          }
          else {
            prevLetterNep = '';
          }

          returnValue = prevLetterNep + consonants2['gyn'] + space[currentLetter];
          previousContentForAtOnce = previousContent + returnValue;
          setLetterInfo('', (undetermined + currentLetter), currentLetter);
        }
        else {
          // shows undetermined words in english
          previousContentForAtOnce = previousContent + undetermined + currentLetter;
          setLetterInfo('', '', '');
        }
      }
    }
    else {
      if ((['h', 'g', 's', 'r', 'y'].indexOf(currentLetter) > -1) && (previousLastLetter != currentLetter)) {
        undetermined = undetermined + currentLetter;
        if (consonants2[undetermined]) { // if undetermined + currentLetter combo will generate a full letter on next iteration
          setLetterInfo(undetermined, undetermined, currentLetter);
        }
        else { // if undetermined + currentLetter do not form a letter on next iteration such as g+r & k+s unlike ch+h
          if (currentLetter == 'r') {
            var halfLetter = previousLetter;
            if (consonants2[halfLetter]) {
              returnValue = consonants2[halfLetter] + diacriticals['\\'];
              previousContentForAtOnce = previousContent + returnValue;
              rCount=1;
              setLetterInfo(currentLetter, currentLetter, currentLetter, returnValue);
              // halfLetterWithR = returnValue;                   
            }
            else {
              setLetterInfo(undetermined);              
            }
          }
          else if (previousLetter == 'k' && currentLetter == 's') {
            setLetterInfo(undetermined, undetermined, currentLetter);
          }
          else if (previousLetter == 'g' && currentLetter == 'y') {
            setLetterInfo(undetermined, undetermined, currentLetter);
          }
          else {
            if (consonants2[previousLetter]) {
              returnValue = consonants2[previousLetter] + diacriticals['\\'];
              previousContentForAtOnce = previousContent + returnValue;
              setLetterInfo(currentLetter, currentLetter, currentLetter);
            }
            else {
              setLetterInfo((previousLetter + currentLetter), undetermined, currentLetter);                  
            }
          }
        } 
      }
      else if ((['h', 'g', 's', 'r', 'y'].indexOf(currentLetter) > -1) && (previousLastLetter == currentLetter) && (currentLetter == 'h')) {
        // for chh
        undetermined = undetermined + currentLetter;
        setLetterInfo(undetermined , undetermined, currentLetter);
      }
      else {
        if ((currentLetter == previousLastLetter) && (currentLetter == 'r')) {
          undetermined = previousLastLetter + currentLetter;
          setLetterInfo(undetermined, undetermined, currentLetter, halfLetterWithR);
          // halfLetterWithR = halfLetterWithR; // keep it same
          rCount+=1;
        }
        else if (previousLastLetter == 'y' && currentLetter == 'n') {
          if (previousLastLetter == previousLetter) {
            undetermined = undetermined + currentLetter;
            setLetterInfo(undetermined, undetermined, undetermined);
          }
          else {
            var YnPos = (undetermined.search('gy') > -1)? undetermined.search('gy') : undetermined.search('y');
            var prevLetterEng = previousLetter.substring(0, YnPos);
            if (consonants2[prevLetterEng]) {
              returnValue = consonants2[prevLetterEng] + diacriticals['\\'];
              previousContentForAtOnce = previousContent + returnValue;
              undetermined = previousLetter.substring(YnPos, previousLetter.length) + currentLetter;
              setLetterInfo(undetermined, undetermined, undetermined);                  
            }
            else {
              undetermined = undetermined + currentLetter;
              setLetterInfo(undetermined, undetermined, currentLetter);
            }
          }
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

            currentLetter = currentLetter == '\\'? '' : currentLetter;
            undetermined = undetermined == '\\'? '' : undetermined;

            previousContentForAtOnce = previousContent + returnValue;
            setLetterInfo(undetermined, currentLetter, currentLetter, '');
          }
          else {
            undetermined = undetermined + currentLetter;
            setLetterInfo(undetermined, currentLetter, currentLetter, '');
          }
        }
      }
    }

    return previousContentForAtOnce;
  }

  var transliterateForNewLetter = function(letterVal, currentLetterVal, previousContentVal, returnValueVal) {
    var letter = letterVal;
    var currentLetter = currentLetterVal;
    var previousContent = previousContentVal || '';
    var returnValue = returnValueVal;
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
                if (consonants2[newLetter]) {
                  returnValue = consonants2[newLetter] + diacriti;                  
                }
              }
            }
            else {
              if (previousLetter == previousLastLetter && currentLetter == previousLastLetter && currentLetter == 'e') { //for ee -> एए
                returnValue = vowels[previousLastLetter] + vowels[currentLetter];
                letter = currentLetter;
              }
              else {
                var newLetter = previousLetter.substring(0, previousLetter.length-1);
                if (consonants2[newLetter]) {
                  returnValue = consonants2[newLetter] + diacriti;
                }
                else {
                  if (currentLetter == previousLastLetter && currentLetter == '*') {
                    // for ** -> ँ chandrabindu
                    letter = previousLastLetter + currentLetter;
                    returnValue = vowels[letter];
                  }
                }
              }                         
            }

            if (returnValue) {
              if (previousLastLetter == 'a') {
                if (previousLetter == previousLastLetter) {
                  previousLetterLength = previousLetter.length; //for kaa
                }
                else if (previousLastLetter == currentLetter) {
                  previousLetterLength = consonants[previousLetter].length || (previousLetter.length - 1);
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
                else if ((previousLastLetter == currentLetter) && (previousLastLetter == '*')) {
                  if (previousLetter.length > 2) {
                    previousLetterLength = previousLetter.length; -1;                  
                  }
                  else {
                    previousLetterLength =  previousLetter.length;
                  }
                }              
                else {
                  previousLetterLength = previousLetter.length;                  
                }
              }

              previousContent = previousContent.substring(0, (previousContent.length-previousLetterLength));
              previousContentForAtOnce = previousContent + returnValue;
              setLetterInfo('', previousLetter + currentLetter, '');              
            }
            else {
              previousContentForAtOnce = previousContent + vowels[currentLetter];
              setLetterInfo('', currentLetter, currentLetter); 
            }
          }
          else {
            if (previousLetter == previousLastLetter && currentLetter == previousLastLetter && currentLetter == 'u') { //for uu -> उउ
              returnValue = vowels[currentLetter];
              letter = currentLetter;
              previousContentForAtOnce = previousContent + returnValue;
              setLetterInfo('', letter, currentLetter);
            }
            else if ((previousLastLetter != currentLetter) || currentLetter == 'u') {
              // for occurrences such as oe, uo, ae, ea, uu, etc where combination of two vowels do not form any diacriticals
              returnValue = vowels[currentLetter];
              letter = currentLetter;
              previousContentForAtOnce = previousContent + returnValue;
              setLetterInfo('', letter, currentLetter);
            }
            else {
              returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
              if (returnValue) {
                previousContentForAtOnce = previousContent + returnValue;
                setLetterInfo('', letter, currentLetter);
              }
              else {
                setLetterInfo(letter);
              }
            }
          }
        }
        else {
          returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
          if (returnValue) {
            previousContentForAtOnce = previousContent + returnValue;
            setLetterInfo('', letter, currentLetter);
          }
          else {
            setLetterInfo(letter);
          }           
        }
    }
    else {
      returnValue = vowels[letter] || numerals[letter] || consonants[letter] || diacriticals[letter] || space[letter];
      if (returnValue) {
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', letter, currentLetter);
      }
      else {
        setLetterInfo(letter, currentLetter, currentLetter);
      }           
    }

    return previousContentForAtOnce;
  }

  this.transliterateAtOnce = function(inputString) {
    var letter, currentLetter, previousContent, returnValue;
    previousContentForAtOnce = '';

    for (var i = 0; i < inputString.length; i++) {
      letter = inputString[i];
      currentLetter = letter;
      if (currentLetter == '\n') {
        completeLetterIfNotComplete(letter);
      }
      else {
        transliterate(currentLetter, currentLetter, previousContentForAtOnce, returnValue);        
      } 
    };
    
    return previousContentForAtOnce;
  }

  var transliterateAtOnce = this.transliterateAtOnce; // so that transliterateAtOnce can be reused within this class

  this.deleteAfterBackspaceOrDelete = function() {
    var returnedVal;
    rCount = 0;
    if (english.value) {
      setLetterInfo('','','','');
      returnedVal = transliterateAtOnce(english.value);
    }
    else {
      setLetterInfo('','','','');
    }
    if (returnedVal) {
      return returnedVal;      
    }
    else {
      previousContentForAtOnce = '';
      return false;
    }
  }

  this.completeLetterIfNotComplete = function(letter) {
    var currentLetter = letter; // for cross checking
    var previousContent = previousContentForAtOnce;
    var returnValue;
    var letter = undetermined;
    returnValue = consonants2[letter];
    if (returnValue) {
      previousContentForAtOnce = previousContent + returnValue + currentLetter;
      setLetterInfo('', '', '');
    }
    else {
      var isGyn = undetermined.search('gyn'); // check and return position of 'gyn' in an undetermined letter
      if (isGyn > -1) {
        // if gyn is present 
        var firstHalfLetterGyn = undetermined.substring(0, isGyn);
        var prevLetterNep;
        if (firstHalfLetterGyn) {
          prevLetterNep = consonants2[firstHalfLetterGyn] +  diacriticals['\\'];
        }
        else {
          prevLetterNep = '';
        }

        returnValue = prevLetterNep + consonants2['gyn'] + space[currentLetter];
        previousContentForAtOnce = previousContent + returnValue;
        setLetterInfo('', '', '');
      }
      else {
        // shows undetermined words in english
        previousContentForAtOnce = previousContent + undetermined + currentLetter;
        setLetterInfo('', '', '');
      }
    }

    return previousContentForAtOnce;
  }

  var completeLetterIfNotComplete = this.completeLetterIfNotComplete;

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

  var setLetterInfo = function(undeterminedVal, previousLetterVal, previousLastLetterVal, halfLetterWithRVal) {
    undetermined = undeterminedVal;
    previousLetter = previousLetterVal;
    previousLastLetter = previousLastLetterVal;
    halfLetterWithR = halfLetterWithRVal;
  }
}