'use strict';

(function () {
  var DEFAULT_ERROR_MESSAGE = 'Не верно заполнено поле';

  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var roomCountToErrorMessage = {
    '1': 'Можно выбрать только 1го гостя',
    '2': 'Можно выбрать 2х или 1го гостя',
    '3': 'Можно выбрать 3х, 2х или 1го гостя',
    '100': 'Не для гостей',
  };

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('.ad-form__element');
  var address = form.querySelector('#address');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');

  function removeEventListeners() {
    roomsCount.removeEventListener('change', onRoomsCountChange);
    guestsCount.removeEventListener('change', onGuestCountChange);
  }

  function addEventListeners() {
    roomsCount.addEventListener('change', onRoomsCountChange);
    guestsCount.addEventListener('change', onGuestCountChange);
  }

  function setFieldsDisable(disabled) {
    fields.forEach(function (field) {
      field.disabled = disabled;
    });

    if (disabled) {
      form.classList.add('ad-form--disabled');
      removeEventListeners();
    } else {
      form.classList.remove('ad-form--disabled');
      addEventListeners();
    }
  }

  function validateGuestsCount() {
    var validGuestsOptions = roomsToGuests[roomsCount.value];
    var errorMessage = '';

    if (validGuestsOptions.indexOf(guestsCount.value) === -1) {
      errorMessage = roomCountToErrorMessage[roomsCount.value]
          || DEFAULT_ERROR_MESSAGE;
    }

    guestsCount.setCustomValidity(errorMessage);
  }

  function setAddress(value) {
    address.value = value;
  }

  function onRoomsCountChange() {
    validateGuestsCount();
  }

  function onGuestCountChange() {
    validateGuestsCount();
  }

  window.form = {
    setDisable: setFieldsDisable,
    setAddress: setAddress,
  };
})();
