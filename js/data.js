'use strict';

(function () {
  var adverts = [];

  function generate(cb) {
    function onSuccess(response) {

      response.forEach(function (advert, index) {
        advert.id = '' + (index + 1);
      });

      window.data.adverts = response;
      cb();
    }

    function onError() {

    }

    window.backend.load(onSuccess, onError);
  }

  window.data = {
    generate: generate,
    adverts: adverts,
  };
})();
