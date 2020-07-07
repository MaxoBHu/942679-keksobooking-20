'use strict';
(function () {
  var MIN_FEATURES = 2;
  var AVATARS_COUNT = 8;

  var timePeriods = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var price = {
    min: 1000,
    max: 1000000,
  };

  var rooms = {
    min: 1,
    max: 10,
  };

  var guests = {
    min: 1,
    max: 10,
  };

  var bookingTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var descriptions = [
    'Великолепный вариан в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Без интернета, регистрации и СМС. Расположена на краю парка',
    'Уютное гнездышко для молодоженов',
    'Подходит для всех кто любит тишину.',
    'Находится в старинном центре города. Только для тех кто может себе позволить роскошь. Лакеев и прочих жокеев просим не беспокоить.',
    'Минимализм во всем. Для самых не требовательных.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Тут красиво, светло и уютно. Кофе и печеньки бесплатно.',
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var titles = [
    'object находится недалеко от метро',
    'object с самым красивым видом на центр года',
    'object для требовательных и богатых',
    'object для командировок',
    'object для одиноких путешественников',
    'object для компании друзей',
    'object для влюбленной пары',
  ];

  function generateTitle(type) {
    var REPLACE = 'object';

    return window.utils.getRandomArrValue(titles).replace(REPLACE, type);
  }

  function generateOrder(order, index) {
    var coords = {
      x: window.utils.setCoordX(window.utils.getRandomInt(window.constants.MAP_MIN_X, window.constants.MAP_MAX_X)),
      y: window.utils.setCoordY(window.utils.getRandomInt(window.constants.MAP_MIN_Y, window.constants.MAP_MAX_Y))
    };

    coords = window.utils.convertCoordsToAddress(coords);

    var offerType = window.utils.getRandomArrValue(Object.keys(bookingTypes));

    order = {
      'author': {
        'avatar': 'img/avatars/' + (index < AVATARS_COUNT ? 'user0' + (index + 1) : 'default') + '.png',
      },
      'offer': {
        'title': generateTitle(bookingTypes[offerType]),
        'address': coords.x + ', ' + coords.y,
        'price': window.utils.getRandomInt(price.min, price.max),
        'type': offerType,
        'rooms': window.utils.getRandomInt(rooms.min, rooms.max),
        'guests': window.utils.getRandomInt(guests.min, guests.max),
        'checkin': window.utils.getRandomArrValue(timePeriods),
        'checkout': window.utils.getRandomArrValue(timePeriods),
        'features': window.utils.getRandomArr(features, window.utils.getRandomInt(MIN_FEATURES, features.length)),
        'description': window.utils.getRandomArrValue(descriptions),
        'photos': window.utils.getRandomArr(photos)
      },
      'location': {
        'x': coords.x,
        'y': coords.y
      }
    };

    return order;
  }

  function generateOrders(count) {
    return new Array(count).fill('').map(generateOrder);
  }

  window.generateOrders = generateOrders;
})();
