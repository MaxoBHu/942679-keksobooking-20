'use strict';
(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var MOUSE_LEFT_BUTTON = 0;

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 82,
  };

  function isEnterEvent(evt) {
    return evt.key === EventKeyCode.ENTER;
  }

  function isMouseLeftButtonEvent(evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  }

  function isEscapeEvent(evt) {
    return evt.key === EventKeyCode.ESCAPE;
  }

  function convertAddressToCoords(coords) {
    return (
      {
        x: coords.x - Math.floor(PinSize.WIDTH / 2),
        y: coords.y - PinSize.HEIGHT,
      }
    );
  }


  window.utils = {
    isEnterEvent: isEnterEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
    isEscapeEvent: isEscapeEvent,
    convertAddressToCoords: convertAddressToCoords,
  };
})();
