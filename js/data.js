'use strict';

(function () {
  var adverts = [];

  function generate() {
    adverts = window.generateOrders(window.constants.ORDER_COUNT);
    window.data.adverts = adverts;
  }

  window.data = {
    generate: generate,
    adverts: adverts,
  };
})();
