var sanityCheck = (function(){
  var self = {
    errors: [],
    display: {
      tagname: "div",
      style: "position:fixed; top:0; left:20px; right:20px; background:white;",
      message: "There is an error in your javascript. Please open your Developer Console for the complete error message."
    }
  };

  window.onerror = recordError;
  window.onload = checkForErrors;

  return sanityCheck;

  ////

  function recordError(message, source, lineno, colno, error) {
    self.errors.push(message);
  };

  function checkForErrors() {
    if (self.errors.length) {
      displayErrors();
    }
  }

  function displayErrors() {
    var el = document.createElement(self.display.tagname);
    el.innerHTML = (
      "<h1 style='" + self.display.style + "'>" +
        self.display.message +
        "<br><br>" +
        "<ol><li>" + self.errors.join("<li>") + "<ol>" +
      "</h1>"
    );
    document.body.appendChild(el);
  }

  // TODO: speculative script-level functionality
  function sanityCheck(scope) {
    var file = scope.src;
    console.log("sanityCheck:", file);
  }


}());
