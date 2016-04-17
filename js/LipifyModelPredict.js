function LipifyModel() {
  vowels = {
    "a": ["अ", "आ"],
    "aa": ["आ"],
    "i": ["इ", "ई"],
    "ii": ["ई"],
    "u": ["उ"],
    "oo": ["ऊ"],
    "e": ["ए"],
    "ai": ["ऐ"],
    "o": ["ओ"],
    "au": ["औ"],
    "am": ["अं"],
    "om": ["ॐ"],
    "aum": ["ॐ"],
    "rri": ["ऋ"],
    "rre": ["ॠ"],
    "*": ["ं"],
    "**": ["ँ"],
    ":": ["ः"]
  };

  numerals = {
    "0": ["०"],
    "1": ["१"],
    "2": ["२"],
    "3": ["३"],
    "4": ["४"],
    "5": ["५"],
    "6": ["६"],
    "7": ["७"],
    "8": ["८"],
    "9": ["९"],
    ".": ["।"]
  }

  consonants = {
    "ka": ["क"],
    "qa": ["क"],
    "ca": ["क"],
    "kha": ["ख"],
    "ga": ["ग"],
    "gha": ["घ"],
    "nga": ["ङ"],
    "cha": ["च", "छ"],
    "chha": ["छ"],
    "ja": ["ज"],
    "za": ["ज"],
    "jha": ["झ"],
    "yna": ["ञ"],
    "ta": ["ट", "त"],
    "tha": ["ठ", "थ"],
    "da": ["ड", "द"],
    "dha": ["ढ", "ध"],
    "na": ["ण", "न"],
    "pa": ["प"],
    "pha": ["फ"],
    "fa": ["फ"],
    "ba": ["ब"],
    "bha": ["भ"],
    "ma": ["म"],
    "ya": ["य"],
    "ra": ["र"],
    "la": ["ल"],
    "va": ["व"],
    "wa": ["व"],
    "sha": ["श", "ष"],
    "sa": ["स", "श", "ष"],
    "ha": ["ह"],
    "ksha": ["क्ष"],
    "xa": ["क्ष"],
    "tra": ["त्र"],
    "gyna": ["ज्ञ"]
  };

  consonants2 = {
    "k": ["क"],
    "q": ["क"],
    "c": ["क"],
    "kh": ["ख"],
    "g": ["ग"],
    "gh": ["घ"],
    "ng": ["ङ"],
    "ch": ["च", "छ"],
    "chh": ["छ"],
    "j": ["ज"],
    "z": ["ज"],
    "jh": ["झ"],
    "yn": ["ञ"],
    "t": ["ट", "त"],
    "th": ["ठ", "थ"],
    "d": ["ड", "द"],
    "dh": ["ढ", "ध"],
    "n": ["ण", "न"],
    "p": ["प"],
    "ph": ["फ"],
    "f": ["फ"],
    "b": ["ब"],
    "bh": ["भ"],
    "m": ["म"],
    "y": ["य"],
    "r": ["र"],
    "l": ["ल"],
    "v": ["व"],
    "w": ["व"],
    "sh": ["श", "ष"],
    "s": ["स", "श", "ष"],
    "h": ["ह"],
    "ksh": ["क्ष"],
    "x": ["क्ष"],
    "tr": ["त्र"],
    "gyn": ["ज्ञ"]
  };

  halfConsonants = {
    "k": ["क्"],
    "q": ["क्"],
    "c": ["क्"],
    "kh": ["ख्"],
    "g": ["ग्"],
    "gh": ["घ्"],
    "ng": ["ङ्"],
    "ch": ["च्", "छ्"],
    "chh": ["छ्"],
    "j": ["ज्"],
    "z": ["ज्"],
    "jh": ["झ्"],
    "yn": ["ञ्"],
    "t": ["ट्", "त्"],
    "th": ["ठ्", "थ्"],
    "d": ["ड्", "द्"],
    "dh": ["ढ्", "ध्"],
    "n": ["ण्", "न्"],
    "p": ["प्"],
    "ph": ["फ्"],
    "f": ["फ्"],
    "b": ["ब्"],
    "bh": ["भ्"],
    "m": ["म्"],
    "y": ["य्"],
    "r": ["र्"],
    "l": ["ल्"],
    "v": ["व्"],
    "w": ["व्"],
    "sh": ["श्", "ष्"],
    "s": ["स्", "श्", "ष्"],
    "h": ["ह्"],
    "ksh": ["क्ष्"],
    "x": ["क्ष्"],
    "tr": ["त्र्"],
    "gyn": ["ज्ञ्"]
  };

  diacriticals = {
    "aa": ["ा"],
    "a": ["ा"],
    "i": ["ि"],
    "ii": ["ी"],
    "ee": ["ी"],
    "u": ["ु"],
    "oo": ["ू"],
    "e": ["े"],
    "ai": ["ै"],
    "o": ["ो"],
    "au": ["ौ"],
    "*": ["ं"],
    "**": ["ँ"],
    "a**": ["ँ"],
    "\\": ["्"],
    "rri": ["ृ"],
    "rre": ["ॄ"],
    ":": ["ः"]
  };

  space = {
    ' ': [' ']
  };


  this.predict = function(input) {
    undetermined = null;
    previousLetter = null;
    previousLastLetter = null;
    previousCombos = [];
    var combo;
    for (var i = 0; i < input.length; i++) {
      combo = transliterate(input[i]);
    };
    return combo;
  }

  var transliterate = function(currentLetterVal) {
    var combo = [];
    if (undetermined) {
      combo = transliterateForUndetermined(currentLetterVal, undetermined, previousLetter, previousLastLetter, previousCombos);

    } else {
      combo = transliterateForNewLetter(currentLetterVal, undetermined, previousLetter, previousLastLetter, previousCombos);
    }
    return combo
  }

  var transliterateForUndetermined = function(currentLetterVal, undeterminedVal, previousLetterVal, previousLastLetterVal, previousCombosVal) {
    var letter = undeterminedVal + currentLetterVal;
    var combo;

    if (vowels[currentLetterVal]) {
      if (currentLetterVal == "a") {
        if (previousLastLetter != "a") {
          combo = consonants[letter];
          var oldCombo = combo;
          var newCombo=[];
          for (var i = 0; i < oldCombo.length; i++) {
            newCombo.push(oldCombo[i] + diacriticals["a"]);
          }
          combo= [].concat.apply(combo, newCombo);
        }
      } 
    }

    if (combo) {
      previousCombos = combo;
      undetermined = currentLetterVal;
      previousLetter = currentLetterVal;
      previousLastLetter = currentLetterVal;
    } else {

    }

    if (combo) {
      return combo
    }
  }

  var transliterateForNewLetter = function(currentLetterVal, undeterminedVal, previousLetterVal, previousLastLetterVal, previousCombosVal) {
    var combo = [];

    combo = halfConsonants[currentLetterVal] || vowels[currentLetterVal];

    if (vowels[currentLetterVal]) {
      undetermined = null;
    } else {
      undetermined = currentLetterVal;
      previousCombos = combo;
      previousLetter = currentLetterVal;
      previousLastLetter = currentLetterVal;

    }

    if (combo) {
      return combo
    }
  }

}