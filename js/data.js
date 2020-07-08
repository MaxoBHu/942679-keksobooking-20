'use strict';

(function () {
  var adverts = [];

  function generate() {
    adverts = window.generateOrders(window.constants.ORDER_COUNT);

    adverts.forEach(function (advert, index) {
      advert.id = '' + (index + 1);
    });

    window.data.adverts = adverts;
  }

  window.data = {
    generate: generate,
    adverts: adverts,
  };
})();
