var sanityChecker = (function(){

  let self = {
    origin: window.location.origin,
    script: document.currentScript,
    storage: JSON.parse(window.localStorage.getItem("sanityChecker") || '{}'),
    errors: [],
    verbose: true
  };

  let override = (function(){
    // converts x-url-formencoded configuration string into hash
    let query_string = self.script.getAttribute("data-config");
    if (!query_string) { return {}; }
    let out = {};
    query_string.substr(1).split("&").forEach(function(param){
      let pair = param.split("=");
      if (pair[1]) {
        out[pair[0]] = decodeURIComponent(pair[1]).replace(/\+/g, " ");
      }
    })
    return out;
  }());

  // image credit: https://commons.wikimedia.org/wiki/File:Human-dialog-error.svg
  let default_error_image = "data:image/jpeg;base64,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";

  let config = {
    image:    override.image    || default_error_image,
    title:    override.title    || "Oh No! Your Javascript is Broken!",
    message:  override.message  || "There is an error in your Javascript. Please open your Developer Console to read the full error message.",
    noShow:   override.noShow   || "Thanks, don't show this warning anymore.",
    minCount: override.minCount || 2
  };

  if ( isTurnedOn() ) {
    window_is_loaded = false;

    // attach event listeners
    window.addEventListener("error", onError, {capture: true});
    window.onload = function displayWarningIfErrors() {
      window_is_loaded = true;
      if (self.errors.length) {
        openWarningModal();
      }
    };

  }

  // verbose error logging for debugging
  var printErrorMessages = (function() {
    if (self.verbose) {
      return function printErrorMessages() {
        var title = "SanityChecker Errors\n--------------------\n";
        var error_output = " * " + self.errors.join("\n * ");
        console.log(title + error_output);
      }
    }
    return function noop(){};
  }());

  return {
    turnOn: turnOn,
    turnOff: turnOff,
    close: closeWarningModal,
    reset: resetStorage
  };

  ////

  function onError(e){
    if (e.message) {
      self.errors.push(e.message);
    } else if (["IMG", "LINK"].includes(e.srcElement.tagName)) {
      // TODO: capture img / link load errrors?
      return;
    } else if (e.srcElement.src.startsWith(self.origin)) {
      // i.e. failed to find a local script (from the same origin)
      self.errors.push("Local Script Not Found: " + e.srcElement.src);
    } else {
      // i.e. failed to load a script from a different origin
      //      unfortunately we cannot specify *which*.
      self.errors.push("Remote Script Not Found");
    }
    if (window_is_loaded && self.errors.length) {
      printErrorMessages();
      openWarningModal();
    }
  }

  function buildIframe() {
    if ( self.iframe ) { return self.iframe; }

    self.iframe = document.createElement("iframe");
    self.iframe.sandbox = "allow-scripts allow-same-origin";
    self.iframe.scrolling = "no";
    self.iframe.onload = function() {
      // sets iframe height to height of iframe body
      this.height = this.contentWindow.document.body.scrollHeight + "px";
    }
    self.iframe.setAttribute("style",
      [
        "position: fixed",
        "width: 100%",
        "max-width: 600px",
        "top: 20px",
        "right: 20px",
        "z-index: 1000000px"
      ].join(";")
    )

    return self.iframe;
  }

  function buildWarningMessage() {
    let el = document.createElement("div");

    el.setAttribute(
      "style",
      [
        "background: white",
        "border: 10px double red",
        "overflow: hidden",
        "padding: 20px",
      ].join(";")
    );

    el.innerHTML = (
      "<button style='float: right;' onclick='window.parent.sanityChecker.close()'>X</button>" +
      "<h1>" +
        "<img style='float: left; padding-right: .3em;' src='" + config.image + "'>" +
        config.title +
      "</h1>" +
      "<p>" + config.message + "</p>"
    );

    if ( showCount() >= config.minCount ) {
      el.innerHTML += (
        "<a style='float:right; font-size: .85em' href='' onclick='window.parent.sanityChecker.turnOff(); return false;'>" +
          config.noShow +
        "</a>"
      );
    }

    return el.outerHTML;
  }

  function openWarningModal() {
    let iframe = buildIframe();
    iframe.srcdoc = buildWarningMessage();
    document.querySelector("body").appendChild(iframe);
    bumpShowCount();
  }

  function closeWarningModal() {
    self.iframe.remove();
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
    window.removeEventListener("error", onError, {capture: true});
  }

  function showCount() {
    return getStorage("show_count") || 0;
  }

  function bumpShowCount() {
    var count = showCount() + 1;
    setStorage("show_count", count);
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
