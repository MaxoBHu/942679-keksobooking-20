'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking',
  };

  var StatusCode = {
    OK: 200
  };

  function createXHR(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  function load(onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', URL.GET, true);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', URL.POST);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save,
  };
})();
