'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var image = pinTemplate.querySelector('img');
  var container = document.querySelector('.map__pins');
  var mainPin = container.querySelector('.map__pin--main');

  function createPin(data) {
    var coords = window.utils.convertAddressToCoords(data.location);

    pinTemplate.style.left = coords.x + 'px';
    pinTemplate.style.top = coords.y + 'px';

    image.alt = data.offer.title;
    image.src = data.author.avatar;

    pinTemplate.dataset.offerId = data.id;

    return pinTemplate.cloneNode(true);
  }

  function render(adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert) {
      var pinNode = createPin(advert);

      fragment.appendChild(pinNode);
    });

    container.insertBefore(fragment, mainPin);

    container.addEventListener('mousedown', onContainerMousedown);
    container.addEventListener('keydown', onContainerKeydown);
  }

  function remove() {
    var pins = container.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
  }

  function showCardForPin(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin !== null && !pin.classList.contains('map__pin--active')) {

      var activeAdvert = window.data.adverts.find(function (advert) {
        if (advert.id === pin.dataset.offerId) {
          return advert;
        }
        return undefined;
      });

      window.card.render(activeAdvert);
      pin.classList.add('map__pin--active');

      window.card.setOnRemove(function () {
        pin.classList.remove('map__pin--active');
      });
    }
  }

  function onContainerMousedown(evt) {
    if (window.utils.isMouseLeftButtonEvent(evt)) {
      showCardForPin(evt);
    }
  }

  function onContainerKeydown(evt) {
    if (window.utils.isEnterEvent(evt)) {
      showCardForPin(evt);
    }
  }

  window.pin = {
    remove: remove,
    render: render,
  };
})();
