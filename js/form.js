'use strict';

(function () {
  var GUEST_ROOMS_EXCEPTION = 100;
  var GUEST_ROOMS_EXCEPTION_ERROR_MESSAGE = 'Помещение не рассчитано для гостей, можно выбрать только "не для гостей"';
  var DEFAULT_PRICE_VALUE = 5000;

  var SETTING = {
    title: {
      minLength: 30,
      maxLength: 100,
    },
    price: {
      maxValue: 1000000,
    },
    address: {
      readOnly: true,
    },
  };

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('.ad-form__element');
  var address = form.querySelector('#address');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');
  var title = form.querySelector('#title');
  var price = form.querySelector('#price');
  var checkin = form.querySelector('#timein');
  var checkout = form.querySelector('#timeout');
  var type = form.querySelector('#type');


  function removeEventListeners() {
    roomsCount.removeEventListener('change', onRoomsCountChange);
    guestsCount.removeEventListener('change', onGuestCountChange);
    type.removeEventListener('change', onTypeChange);
    checkin.removeEventListener('change', onCheckinChange);
    checkout.removeEventListener('change', onCheckoutChange);
  }

  function addEventListeners() {
    roomsCount.addEventListener('change', onRoomsCountChange);
    guestsCount.addEventListener('change', onGuestCountChange);
    type.addEventListener('change', onTypeChange);
    checkin.addEventListener('change', onCheckinChange);
    checkout.addEventListener('change', onCheckoutChange);
  }

  function setFieldsDisable(disabled) {
    fields.forEach(function (field) {
      field.disabled = disabled;
    });

    if (disabled) {
      form.classList.add('ad-form--disabled');
      removeEventListeners();
    } else {
      title.required = true;
      price.required = true;
      form.classList.remove('ad-form--disabled');
      addEventListeners();
    }
  }

  function configureFields() {
    title.minLength = SETTING.title.minLength;
    title.maxLength = SETTING.title.maxLength;
    price.max = SETTING.price.maxValue;
    address.readOnly = SETTING.address.readOnly;

    setMinPriceForApartment();
    validateGuestsCount();
  }

  function validateGuestsCount() {
    var errorMessage = '';

    if (Number(roomsCount.value) === GUEST_ROOMS_EXCEPTION) {
      errorMessage = GUEST_ROOMS_EXCEPTION_ERROR_MESSAGE;
    } else if (Number(roomsCount.value) < Number(guestsCount.value)) {
      errorMessage = 'Можно выбрать ' + roomsCount.value + ' и менее гостей';
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

  function setMinPriceForApartment() {
    price.min = price.placeholder = DEFAULT_PRICE_VALUE;
  }

  function onTypeChange() {
    setMinPriceForApartment();
  }

  function onCheckinChange() {
    checkout.value = checkin.value;
  }

  function onCheckoutChange() {
    checkin.value = checkout.value;
  }

  configureFields();

  window.form = {
    setDisable: setFieldsDisable,
    setAddress: setAddress,
  };
})();
