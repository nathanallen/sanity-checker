var sanityChecker = (function(){

  let self = {
    script: document.currentScript,
    storage: JSON.parse(window.localStorage.getItem("sanityChecker") || '{}'),
    errors: []
  };

  let override = JSON.parse(self.script.getAttribute("data-config") || '{}');
  let config = {
    image:    override.image    || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABNklEQVR4Ab3TtWFVURzA4S/X4oO8MbAWf7JCPCV0VLivEJsCXSGuE1BxG/xPqmcHSZXv11456txVOjYcqNX2rWup/MMtJ2KoY7cglXkuhE1LGqZOa1iyKYSnMonnwlezMl3IzPoqPE4HE766KMVFX4WbuqicCLOYxoQc5CYwjTnhWKmrJWzKTNv2ykdrYM1Hr22bltkUWrrWhSXwWghN0BTCK7AsrOk6EBqY8FEIL8ALIXw0gYawr6sWppBb0/TCMlj2QtOaHFNCnbzwD90X6A7JP3SHlEyaEbe89em0t24ZIZ10d1lR2BC6WVcgsyW0dFWOhVk8FEM9wJxwqEyPxhV33Rvqjiu+CteQHj5zyeGb8014JJF5JoRNy93jvWxTCI9kZ79Ah677h0rbun21z/asaiqds9/ww5+vl4reiAAAAABJRU5ErkJggg==",
    title:    override.title    || "Oh No! Your Javascript is Broken!",
    message:  override.message  || "There is an error in your Javascript. Please open your Developer Console to read the full error message.",
    noShow:   override.noShow   || "Thanks, don't show this warning anymore.",
    minCount: override.minCount || 2
  };

  if ( isTurnedOn() ) {
    // attach event listeners
    window.onerror = function recordErrors(message, source, lineno, colno, error) {
      self.errors.push(message);
    };

    window.onload = function displayWarningIfErrors() {
      if (self.errors.length) {
        openWarningModal();
      }
    };
  }

  return {
    turnOn: turnOn,
    turnOff: turnOff,
    close: closeWarningModal,
    reset: resetStorage
  };

  ////


  function openWarningModal() {
    let el = self.el = document.createElement("div");

    el.style = [
      "position: fixed;",
      "top: 20px;",
      "right: 20px;",
      "max-width: 600px;",
      "background: white;",
      "border: 10px double red;",
      "overflow: hidden;",
      "padding: 20px;",
      "z-index: 10000000;"
    ].join("")

    el.innerHTML = (
      "<button style='float: right;' onclick='sanityChecker.close()'>X</button>" +
      "<h1>" +
        "<img style='float: left; padding-right: .3em;' src='" + config.image + "'>" +
        config.title +
      "</h1>" +
      "<p>" + config.message + "</p>" + noShowButton()
    );

    document.querySelector("body").appendChild(el);

    ////
      function noShowButton() {
        return ( bumpShowCount() < config.minCount ) ? "" : (
          "<a style='float:right; font-size: .85em' href='' onclick='sanityChecker.turnOff(); return false;'>" +
            config.noShow +
          "</a>"
        );
      }
  }

  function closeWarningModal() {
    self.el.remove();
  }

  function isTurnedOn() {
    return getStorage("check_for_errors") !== false;
  }

  function turnOn() {
    setStorage("check_for_errors", true);
    return true;
  }

  function turnOff() {
    closeWarningModal();
    setStorage("check_for_errors", false);
  }

  function bumpShowCount() {
    var count = getStorage("show_count") || 0;
    setStorage("show_count", count+1);
    return count;
  }

  function getStorage(key) {
    return self.storage[key];
  }

  function setStorage(key, val) {
    self.storage[key] = val;
    window.localStorage.setItem("sanityChecker", JSON.stringify(self.storage));
  }

  function resetStorage() {
    window.localStorage.removeItem("sanityChecker");
  }

}());
