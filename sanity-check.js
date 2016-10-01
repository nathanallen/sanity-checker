var sanityChecker = (function(){

  let ERRORS = [];

  let config = {
    display: {
      target: "body",
      tagname: "div",
      style: [
        "position: fixed;",
        "text-align: center;",
        "top: 20px;",
        "right: 20px;",
        "max-width: 600px;",
        "background: white;",
        "border: 10px double red;",
        "overflow: hidden;",
        "padding: 20px;",
        "z-index: 10000000;"
      ].join(""),
      title: "Uh oh! Something is broken in your Javascript!",
      message: "Please open your Developer Console to read the full error message.",
      bullets: [
        "What file is it in?",
        "What line is it on?",
        "What type of error is it?"
      ]
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
      "<ul style='max-width: 600px; margin: 0 auto; text-align: left;'>" +
        "<p>" + config.display.message + "</p>" +

        config.display.bullets.map(function(text){
          return "<li>" + text + "</li>";
        }).join("") +

      "</ul>" +
      "<br>" +
      "<small style='float:right;'>" +
        "<a href='' onclick='sanityChecker.turnOff()'>" +
          "Thanks, don't show this warning anymore." +
        "</a>" +
      "</small>"
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
