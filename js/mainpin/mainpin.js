'use strict';

(function () {
  var DEFAULT_LEFT = 602;
  var DEFAULT_TOP = 407;
  var X_GAP = 65 / 2;
  var Y_GAP = 82;

  var map = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');

  var offset = {
    map: {
      minX: 0,
      maxX: map.offsetWidth,
      minY: 130,
      maxY: 630,
    },
  };

  function setAddress() {
    var pinX;
    var pinY;

    if (window.map.disabled) {
      pinX = Math.floor(pin.offsetLeft + pin.offsetWidth / 2);
      pinY = Math.floor(pin.offsetTop + pin.offsetHeight / 2);
    } else {
      pinX = Math.floor(pin.offsetLeft + X_GAP);
      pinY = Math.floor(pin.offsetTop + Y_GAP);
    }
    window.form.setAddress(pinX + ', ' + pinY);
  }

  function enableMap() {
    pin.removeEventListener('keydown', onPinKeydown);

    window.map.setEnabled();
  }

  function onPinMousedown(evt) {
    if (window.utils.isMouseLeftButtonEvent(evt)) {
      if (window.map.disabled) {
        enableMap();
        setAddress();
      }

      offset.map.x = map.offsetLeft;
      offset.map.y = map.offsetTop;
      offset.map.maxX = map.offsetWidth;
    }
  }

  function onPinKeydown(evt) {
    if (window.util.isEnterEvent(evt)) {
      enableMap();
      pin.removeEventListener('keydown', onPinKeydown);
    }
  }

  function setDefault() {
    pin.addEventListener('mousedown', onPinMousedown);
    pin.addEventListener('keydown', onPinKeydown);

    pin.style.left = DEFAULT_LEFT - pin.offsetWidth / 2 + 'px';
    pin.style.top = DEFAULT_TOP - pin.offsetHeight / 2 + 'px';

    setAddress();
  }

  window.mainPin = {
    reset: setDefault,
    setAddress: setAddress,
  };
})();
