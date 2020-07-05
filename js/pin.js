'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var image = pin.querySelector('img');

  function createPin(data) {
    var coords = window.Utils.convertAddressToCoords(data.location);

    pin.style.left = coords.x + 'px';
    pin.style.top = coords.y + 'px';

    image.alt = data.offer.title;
    image.src = data.author.avatar;

    return pin.cloneNode(true);
  }

  window.createPin = createPin;
})();
