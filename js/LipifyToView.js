function LipifyToView () {
  
  var parent = document.getElementById('lipifyMe');
  var nepali, english;

  this.createInputDiv = function() {
    var input = document.createElement('textarea');
    input.setAttribute("id", 'transliterateThis');
    input.setAttribute("autofocus", true);
    parent.appendChild(input);
    english = input;
    return input;

  }

  this.createOutputDiv = function() {
    var output = document.createElement('textarea');
    output.setAttribute("id", 'nepali');
    output.setAttribute("readonly", true);
    parent.appendChild(output);
    nepali = output;
    return output;    
  }

  this.writeNepali = function(val) {
    nepali.value = val;
  }
}