'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var image = pin.querySelector('img');
  var container = document.querySelector('.map__pins');
  var mainPin = container.querySelector('.map__pin--main');

  function createPin(data) {
    var coords = window.utils.convertAddressToCoords(data.location);

    pin.style.left = coords.x + 'px';
    pin.style.top = coords.y + 'px';

    image.alt = data.offer.title;
    image.src = data.author.avatar;

    return pin.cloneNode(true);
  }

  function render(adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      var pinNode = createPin(advert);

      fragment.appendChild(pinNode);
    });

    container.insertBefore(fragment, mainPin);
  }

  window.pin = {
    render: render,
  };
})();
