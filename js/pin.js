'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var image = pinTemplate.querySelector('img');
  var container = document.querySelector('.map__pins');
  var mainPin = container.querySelector('.map__pin--main');

  function createPin(data, advertId) {
    var coords = window.utils.convertAddressToCoords(data.location);

    pinTemplate.style.left = coords.x + 'px';
    pinTemplate.style.top = coords.y + 'px';

    image.alt = data.offer.title;
    image.src = data.author.avatar;

    pinTemplate.dataset.offerId = advertId;

    return pinTemplate.cloneNode(true);
  }

  function render(adverts) {
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (advert, advertId) {
      var pinNode = createPin(advert, advertId);

      fragment.appendChild(pinNode);
    });

    container.insertBefore(fragment, mainPin);

    container.addEventListener('mousedown', onContainerMousedown);
    container.addEventListener('keydown', onContainerKeydown);
  }

  function showCardForPin(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin !== null && !pin.classList.contains('map__pin--active')) {
      window.card.render(window.data.adverts[pin.dataset.offerId]);
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
    render: render,
  };
})();
