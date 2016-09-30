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
        "border: 10px double red;",
        "overflow: hidden;",
        "padding: 20px;",
        "z-index: 10000000;"
      ].join(""),
      title: "Uh oh! Something is broken in your Javascript!",
      message: "Please open your Developer Console to read the full error message."
    }
  };

  if ( isTurnedOn() ) {
    // attach event listeners
    window.onerror = function recordErrors(message, source, lineno, colno, error) {
      ERRORS.push(message);
    };

    window.onload = function displayWarningIfErrors() {
      if (ERRORS.length) {
        openWarningModal();
      }
    };
  }

  return {
    turnOn: turnOn,
    turnOff: turnOff,
    close: closeWarningModal
  };

  ////


  function openWarningModal() {
    var el = self.el = document.createElement(config.display.tagname);
    el.style = config.display.style;
    el.innerHTML = (
      "<button style='float: right;' onclick='sanityChecker.close()'>X</button>" +
      "<h1>" + config.display.title + "</h1>" +
      "<p>" + config.display.message + "</p>" +
      "<li>" + "What file is in?" + "</li>" +
      "<li>" + "What line is it on?" + "</li>" +
      "<li>" + "What type of error is it?" + "</li>" +
      "<br>" +
      "<small style='float:right'><a href='' onclick='sanityChecker.turnOff()'>" + "Thanks, don't show this warning anymore" + "</a></small>"
    );

    document.querySelector(config.display.target).appendChild(el);
  }

  function closeWarningModal() {
    self.el.remove();
  }

  function isTurnedOn() {
    return window.localStorage.getItem("check_for_errors") === 'true';
  }

  function turnOn() {
    window.localStorage.setItem("check_for_errors", true);
    return true;
  }

  function turnOff() {
    closeWarningModal();
    window.localStorage.setItem("check_for_errors", null);
    return false; // prevent default
  }

}());
