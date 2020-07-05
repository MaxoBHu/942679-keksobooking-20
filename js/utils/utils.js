'use strict';
(function () {
  var ESK_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var Utils = {
    RenderPosition: {
      AFTERBEGIN: 'afterbegin',
      BEFOREEND: 'beforeend',
    },

    isEscKeycode: function (evt) {
      return evt.keyCode === ESK_KEYCODE;
    },

    isEnterKeycode: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    getEndWord: function (number, txt) {
      var cases = [2, 0, 1, 1, 1, 2];
      var index = 0;
      if (number % 100 > 4 && number % 100 < 20) {
        index = 2;
      } else {
        index = cases[(number % 10 < 5) ? number % 10 : 5];
      }
      return txt[index];
    },

    renderElement: function (container, element, place) {
      switch (place) {
        case window.Utils.RenderPosition.AFTERBEGIN:
          container.prepend(element);
          break;
        case window.Utils.RenderPosition.BEFOREEND:
          container.append(element);
          break;
      }
    },

    renderElements: function (container, elements, place) {
      var fragment = document.createDocumentFragment();

      elements.forEach(function (element) {
        fragment.appendChild(element);
      });

      window.Utils.renderElement(container, fragment, place);
    },

    render: function (container, element, place) {
      place = place ? place : window.Utils.RenderPosition.BEFOREEND;

      if (Array.isArray(element)) {
        window.Utils.renderElements(container, element, place);
      } else {
        window.Utils.renderElement(container, element, place);
      }
    },

    remove: function (component) {
      component.getElement().remove();
      component.removeElement();
    },

    createElement: function (template) {
      var newElement = document.createElement('div');
      newElement.innerHTML = template;

      return newElement.firstChild;
    },

    setCoordX: function (x) {
      var minX = window.constants.MAP_MIN_X;
      var maxX = window.constants.MAP_MAX_X - window.constants.MAIN_PIN_WIDTH;
      return Math.max(Math.min(x, maxX), minX);
    },

    setCoordY: function (y) {
      var minY = window.constants.MAP_MIN_Y;
      var maxY = window.constants.MAP_MAX_Y;
      return Math.max(Math.min(y, maxY), minY);
    },

    getRandomInt: function (min, max) {
      return min + Math.floor(Math.random() * (max - min));
    },

    getRandomArrValue: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomArr: function (arr, length) {
      length = length ? length : arr.length;
      var randomArr = arr.slice();
      randomArr.sort(function () {
        return Math.random() - 0.5;
      });
      return randomArr.slice(0, length);
    },

    convertCoordsToAddress: function (coords) {
      return (
        {
          x: coords.x + Math.floor(window.constants.MAIN_PIN_WIDTH / 2),
          y: coords.y + window.constants.MAIN_PIN_HEIGHT,
        }
      );
    },

    convertAddressToCoords: function (coords) {
      return (
        {
          x: coords.x - Math.floor(window.constants.PIN_WIDTH / 2),
          y: coords.y - window.constants.PIN_HEIGHT,
        }
      );
    },
  };

  window.Utils = Utils;
})();
