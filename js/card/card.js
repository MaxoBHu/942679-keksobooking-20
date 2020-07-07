'use strict';
(function () {
  var mapContainer = document.querySelector('.map');
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.children[0];
  var popupPhoto = templateCard.querySelector('.popup__photo');

  var typeEnToRu = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  function getAdvertFeatures(features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (it) {
      var li = document.createElement('li');

      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + it);

      fragment.appendChild(li);
    });

    return fragment;
  }

  function getAdvertPhotos(photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (it) {
      var image = popupPhoto.cloneNode(true);

      image.src = it;

      fragment.appendChild(image);
    });

    return fragment;
  }

  function getOfferAd(cardData) {
    var popupNode = templateCard.cloneNode(true);

    var offerAdFeatures = getAdvertFeatures(cardData.offer.features);
    var offerAdPhotos = getAdvertPhotos(cardData.offer.photos);

    popupNode.querySelector('.popup__avatar').src = cardData.author.avatar;
    popupNode.querySelector('.popup__title').textContent = cardData.offer.title;
    popupNode.querySelector('.popup__text--address').textContent = cardData.offer.address;
    popupNode.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    popupNode.querySelector('.popup__type').textContent = typeEnToRu[cardData.offer.type];
    popupNode.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    popupNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    var features = popupNode.querySelector('.popup__features');
    features.innerHTML = '';
    features.appendChild(offerAdFeatures);
    popupNode.querySelector('.popup__description').textContent = cardData.offer.description;
    var photos = popupNode.querySelector('.popup__photos');
    photos.innerHTML = '';
    photos.appendChild(offerAdPhotos);

    return popupNode;
  }

  function renderMapCard(cardData) {
    var mapCard = getOfferAd(cardData);

    mapContainer.insertBefore(mapCard, mapFilterContainer);
  }

  window.card = {
    render: renderMapCard,
  };
})();
