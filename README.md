# SanityChecker

SanityChecker is a learning aid for beginner students of web development. On detecting a javascript error, it launches a modal that serves to remind students to look for javascript error messages in their developer consoles. ~~It also attempts to clarify why the error occured and hint at possible solutions.~~

After 3 appearances, the modal may be turned off permanently.

<img width="585" alt="Warning Modal: There is an error in your javascript." src="https://cloud.githubusercontent.com/assets/1489337/19081641/d6181084-8a0f-11e6-8710-a656a967e03a.png">

**Dependencies**: ES6 Javascript, localStorage

## Setup
To use SanityChecker, simply include a script tag (ideally it should be the first script on the page):

```html
<script src="sanity-checker.js"></script>

// optionally it may be configured with a url-encoded string
<script src="sanity-checker.js"
    data-config="?title=Custom+Title&message=Custom+Message&image=http%3A%2F%2Fplacehold.it%2F200%2Ff00%3Ftext%3D%5Blogo%5D"></script>
```

#### Custom configuration options

> Options should be encoded as a url-encoded string.

* `image` - link or data-url (default: [Human Dialog Error](https://commons.wikimedia.org/wiki/File:Human-dialog-error.svg))
* `title` - html title of modal (default: "Oh No! Your Javascript is Broken!")
* `message` - html body of modal (default: "There is an error in your Javascript. Please open your Developer Console to read the full error message.")
* `noShow` - html text of anchor (default: "Thanks, don't show this warning anymore.")
* `minCount` - number of times modal will appear before option to cancel is offered (default: 2)


#### API

``` js
sanityChecker.turnOff();    // turn off future reminders
sanityChecker.turnOn();     // turn back on
sanityChecker.close();      // close the modal window
sanityChecker.reset();      // reset stats in localstorage
```

## Testing
A sandbox environment is available in `/test/index.html` (as well as online at [http://nathan.codes/sanity-checker/test/](http://nathan.codes/sanity-checker/test/)) for manual configuration and testing of the script.

## Known Limitations
* Presumably for security reasons, when an error is thrown/raised in a script file loaded from a remote origin, the error event will not identify the script or file that raised it.
* Javascript [errors thrown directly from the console](http://stackoverflow.com/questions/17534054/chrome-will-an-error-in-code-invoked-from-the-dev-console-trigger-window-onerro) do not bubble up to the window, meaning code may safely be tested in the console without launching the warning modal (it's a feature not a bug!)
* On chrome using `window.console.error` displays an error-like message in the console but does not in fact _throw_ or _raise_ an error and so cannot be captured.
