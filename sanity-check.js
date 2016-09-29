var sanityChecker = (function(){

  let ERRORS = [];

  let config = {
    display: {
      target: "body",
      tagname: "div",
      style: [
        "position: fixed;",
        "top: 0;",
        "left: 20px;",
        "right: 20px;",
        "background: white;",
        "border: 1px dotted black;",
        "padding: 20px;"
      ].join(""),
      message: "There is an error in your javascript. Please open your Developer Console for the complete error message."
    }
  };

  if ( isTurnedOn() ) {
    // attach event listeners
    window.onerror = recordError;
    window.onload = displayWarningIfErrors;
  }

  return {
    errors: ERRORS,
    turnOn: turnOn,
    turnOff: turnOff
  };

  ////

  function recordError(message, source, lineno, colno, error) {
    ERRORS.push(message);
  };

  function displayWarningIfErrors() {
    if (ERRORS.length) {
      displayWarning();
    }
  }

  function displayWarning() {
    var el = document.createElement(config.display.tagname);
    el.innerHTML = (
      "<h1 style='" + config.display.style + "'>" +
        config.display.message +
        "<br><br>" +
        "<ol><li>" + ERRORS.join("<li>") + "<ol>" +
      "</h1>"
    );
`    document.querySelector(config.display.target).appendChild(el);
  }

  // // TODO: speculative script-level functionality
  // // e.g. `<script onload='sanityCheck(this)'></script>`
  // function sanityCheck(scope) {
  //   var file = scope.src;
  //   console.log("sanityCheck:", file);
  // }

  function isTurnedOn() {
    return window.localStorage.getItem("check_for_errors") === 'true'
  }

  function turnOn() {
    window.localStorage.setItem("check_for_errors", true);
    return true;
  }

  function turnOff() {
    window.localStorage.setItem("check_for_errors", null);
    return false;
  }

}());
