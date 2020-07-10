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

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 82,
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
        x: coords.x + Math.floor(PinSize.MAIN_WIDTH / 2),
        y: coords.y + PinSize.MAIN_HEIGHT,
      }
    );
  }

  function convertAddressToCoords(coords) {
    return (
      {
        x: coords.x - Math.floor(PinSize.WIDTH / 2),
        y: coords.y - PinSize.HEIGHT,
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
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getRandomArr: getRandomArr,
    convertCoordsToAddress: convertCoordsToAddress,
    convertAddressToCoords: convertAddressToCoords,
  };
})();
