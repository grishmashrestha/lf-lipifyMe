function LipifyToView () {
  
  var parent = document.getElementById('lipifyMe');
  var nepali, english, nepaliAutocomplete;

  this.createInputDiv = function() {
    var input = document.createElement('textarea');
    input.setAttribute('id', 'transliterateThis');
    input.setAttribute('autofocus', true);
    parent.appendChild(input);
    english = input;
    return input;

  }

  this.createOutputDiv = function() {
    var output = document.createElement('textarea');
    output.setAttribute('id', 'nepali');
    output.setAttribute('readonly', true);
    parent.appendChild(output);
    nepali = output;
    return output;    
  }

  this.createAutocompleteDiv = function() {
    var autoCompleteDiv = document.createElement('div');
    autoCompleteDiv.setAttribute('id', 'nepali');
    autoCompleteDiv.setAttribute('readonly', true);
    parent.appendChild(autoCompleteDiv);
    nepaliAutocomplete = autoCompleteDiv;
    return autoCompleteDiv;
  }

  this.writeNepali = function(val) {
    nepali.value = val;
  }

  this.writeResult = function(val) {
    nepaliAutocomplete.innerHTML = ''; // reset innerHTML for new comtents, otherwise it just adds more results to previous results
    var ul = document.createElement('ul');
    nepaliAutocomplete.appendChild(ul);
    for (x in val) {
      var li = document.createElement('li');
      li.setAttribute('id', val[x]);
      li.setAttribute('class', 'prediction');
      ul.appendChild(li);
      li.innerText = val[x];
    }
  }
}