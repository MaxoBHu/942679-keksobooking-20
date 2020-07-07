'use strict';
(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var MOUSE_LEFT_BUTTON = 0;

  var RenderToPosition = {
    AFTER_BEGIN: 'afterbegin',
    BEFORE_END: 'beforeend',
  };

  function isEnterEvent(evt) {
    return evt.key === EventKeyCode.ENTER;
  }

  function isMouseLeftButtonEvent(evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  }

  function isEscapeEvent(evt) {
    return evt.key === EventKeyCode.ESCAPE;
  }

  function getEndWord(number, txt) {
    var cases = [2, 0, 1, 1, 1, 2];
    var index = 0;
    if (number % 100 > 4 && number % 100 < 20) {
      index = 2;
    } else {
      index = cases[(number % 10 < 5) ? number % 10 : 5];
    }
    return txt[index];
  }

  function renderElement(container, element, place) {
    switch (place) {
      case RenderToPosition.AFTER_BEGIN:
        container.prepend(element);
        break;
      case RenderToPosition.BEFORE_END:
        container.append(element);
        break;
    }
  }

  function renderElements(container, elements, place) {
    var fragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      fragment.appendChild(element);
    });

    renderElement(container, fragment, place);
  }

  function render(container, element, place) {
    place = place ? place : RenderToPosition.BEFORE_END;

    if (Array.isArray(element)) {
      renderElements(container, element, place);
    } else {
      renderElement(container, element, place);
    }
  }

  function remove(component) {
    component.getElement().remove();
    component.removeElement();
  }

  function createElement(template) {
    var newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  function setCoordX(x) {
    var minX = window.constants.MAP_MIN_X;
    var maxX = window.constants.MAP_MAX_X - window.constants.MAIN_PIN_WIDTH;
    return Math.max(Math.min(x, maxX), minX);
  }

  function setCoordY(y) {
    var minY = window.constants.MAP_MIN_Y;
    var maxY = window.constants.MAP_MAX_Y;
    return Math.max(Math.min(y, maxY), minY);
  }

  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  function getRandomArrValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomArr(arr, length) {
    length = length ? length : arr.length;
    var randomArr = arr.slice();
    randomArr.sort(function () {
      return Math.random() - 0.5;
    });
    return randomArr.slice(0, length);
  }

  function convertCoordsToAddress(coords) {
    return (
      {
        x: coords.x + Math.floor(window.constants.MAIN_PIN_WIDTH / 2),
        y: coords.y + window.constants.MAIN_PIN_HEIGHT,
      }
    );
  }

  function convertAddressToCoords(coords) {
    return (
      {
        x: coords.x - Math.floor(window.constants.PIN_WIDTH / 2),
        y: coords.y - window.constants.PIN_HEIGHT,
      }
    );
  }


  window.utils = {
    isEnterEvent: isEnterEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
    isEscapeEvent: isEscapeEvent,
    getEndWord: getEndWord,
    renderElement: renderElement,
    renderElements: renderElements,
    render: render,
    remove: remove,
    createElement: createElement,
    setCoordX: setCoordX,
    setCoordY: setCoordY,
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getRandomArr: getRandomArr,
    convertCoordsToAddress: convertCoordsToAddress,
    convertAddressToCoords: convertAddressToCoords,
  };
})();
