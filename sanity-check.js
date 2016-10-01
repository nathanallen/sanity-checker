var sanityChecker = (function(){

  let ERRORS = [];

  let config = {
    display: {
      target: "body",
      tagname: "div",
      style: [
        "position: fixed;",
        "top: 20px;",
        "right: 20px;",
        "max-width: 600px;",
        "background: white;",
        "border: 10px double red;",
        "overflow: hidden;",
        "padding: 20px;",
        "z-index: 10000000;"
      ].join(""),
      img: document.currentScript.getAttribute("data-img-src") || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABNklEQVR4Ab3TtWFVURzA4S/X4oO8MbAWf7JCPCV0VLivEJsCXSGuE1BxG/xPqmcHSZXv11456txVOjYcqNX2rWup/MMtJ2KoY7cglXkuhE1LGqZOa1iyKYSnMonnwlezMl3IzPoqPE4HE766KMVFX4WbuqicCLOYxoQc5CYwjTnhWKmrJWzKTNv2ykdrYM1Hr22bltkUWrrWhSXwWghN0BTCK7AsrOk6EBqY8FEIL8ALIXw0gYawr6sWppBb0/TCMlj2QtOaHFNCnbzwD90X6A7JP3SHlEyaEbe89em0t24ZIZ10d1lR2BC6WVcgsyW0dFWOhVk8FEM9wJxwqEyPxhV33Rvqjiu+CteQHj5zyeGb8014JJF5JoRNy93jvWxTCI9kZ79Ah677h0rbun21z/asaiqds9/ww5+vl4reiAAAAABJRU5ErkJggg==",
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
      "<h1>" +
        "<img style='float: left; padding-right: .3em;' src='" + config.display.img + "'>" +
        config.display.title +
      "</h1>" +
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
