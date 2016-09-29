var sanityCheck = (function(){
  var self = {
    errors: []
  };

  window.onerror = function(message, source, lineno, colno, error) {
    self.errors.push(message);
  };

  window.onload = function() {
    if (self.errors.length) {
      var el = document.createElement("div");
      el.innerHTML = (
        "<h1 style='position:fixed; top:0; left:20px; right:20px; background:white;'>" +
          "plz to check your console for an important error message" +
          "<br><br>" +
          "<ol><li>" + self.errors.join("<li>") + "<ol>" +
        "</h1>"
      );
      document.body.appendChild(el);
    }
  }

  return function sanityCheck(scope) {
    var file = scope.src;
    console.log("sanityCheck:", file);
  }

}());
