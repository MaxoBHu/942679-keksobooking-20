'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeoutId = 0;

  function debounce(onTimeout) {
    if (lastTimeoutId > 0) {
      window.clearTimeout(lastTimeoutId);
    }

    lastTimeoutId = window.setTimeout(function () {
      onTimeout();
    }, DEBOUNCE_INTERVAL);
  }

  window.debounce = debounce;
})();
