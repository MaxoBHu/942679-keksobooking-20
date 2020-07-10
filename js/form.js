'use strict';

(function () {
  var GUEST_ROOMS_EXCEPTION = 100;
  var GUEST_ROOMS_EXCEPTION_ERROR_MESSAGE = 'Помещение не рассчитано для гостей, можно выбрать только "не для гостей"';

  var SETTING = {
    form: {
      action: 'https://javascript.pages.academy/keksobooking'
    },
    avatar: {
      accept: 'image/png, image/jpeg',
    },
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
    images: {
      accept: 'image/png, image/jpeg',
    },
  };

  var DefaultValue = {
    TYPE: 'flat',
    ROOMS: 1,
    GUESTS: 3,
    TIMEIN: '12:00',
    TIMEOUT: '12:00',
  };

  var typeToMinPrice = {
    bungalo: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('.ad-form__element');
  var inputFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="file"], textarea');
  var checkboxFields = form.querySelectorAll('input[type="checkbox"]');

  var avatar = form.querySelector('#avatar');
  var title = form.querySelector('#title');
  var address = form.querySelector('#address');
  var price = form.querySelector('#price');
  var checkin = form.querySelector('#timein');
  var checkout = form.querySelector('#timeout');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');
  var type = form.querySelector('#type');
  var images = form.querySelector('#images');

  function resetFields() {
    inputFields.forEach(function (field) {
      field.value = '';
    });

    checkboxFields.forEach(function (field) {
      field.checked = false;
    });

    type.value = DefaultValue.TYPE;
    price.min = price.placeholder = typeToMinPrice[type.value];
    roomsCount.value = DefaultValue.ROOMS;
    guestsCount.value = DefaultValue.GUESTS;
    checkin.value = DefaultValue.TIMEIN;
    checkout.value = DefaultValue.TIMEOUT;
  }

  function removeEventListeners() {
    form.removeEventListener('submit', onFormSubmit);
    form.removeEventListener('reset', onFormReset);
    roomsCount.removeEventListener('change', onRoomsCountChange);
    guestsCount.removeEventListener('change', onGuestCountChange);
    type.removeEventListener('change', onTypeChange);
    checkin.removeEventListener('change', onCheckinChange);
    checkout.removeEventListener('change', onCheckoutChange);
  }

  function addEventListeners() {
    form.addEventListener('submit', onFormSubmit);
    form.addEventListener('reset', onFormReset);
    roomsCount.addEventListener('change', onRoomsCountChange);
    guestsCount.addEventListener('change', onGuestCountChange);
    type.addEventListener('change', onTypeChange);
    checkin.addEventListener('change', onCheckinChange);
    checkout.addEventListener('change', onCheckoutChange);
  }

  function toggleFieldsDisable(disabled) {
    avatar.disabled = disabled;

    fields.forEach(function (field) {
      field.disabled = disabled;
    });

    if (disabled) {
      window.preview.setDisabled();
      title.required = false;
      price.required = false;
      form.classList.add('ad-form--disabled');
      removeEventListeners();
      resetFields();
    } else {
      window.preview.setEnabled();
      title.required = true;
      price.required = true;
      form.classList.remove('ad-form--disabled');
      addEventListeners();
      configureFields();
    }
  }

  function configureFields() {
    form.action = SETTING.form.action;
    avatar.accept = SETTING.avatar.accept;
    title.minLength = SETTING.title.minLength;
    title.maxLength = SETTING.title.maxLength;
    price.max = SETTING.price.maxValue;
    address.readOnly = SETTING.address.readOnly;
    images.accept = SETTING.images.accept;

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

  function onTypeChange() {
    setMinPriceForApartment();
  }

  function onCheckinChange() {
    checkout.value = checkin.value;
  }

  function setMinPriceForApartment() {
    price.min = price.placeholder = typeToMinPrice[type.value];
  }

  function onCheckoutChange() {
    checkin.value = checkout.value;
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    function onLoad(response) {
      window.map.setDisabled();
      toggleFieldsDisable(true);
      window.card.remove();
      window.pin.remove();
      window.mainPin.reset();
      window.mainPin.setAddress();
      window.message.showLoadSuccess(response);
    }

    var onError = function (error) {
      window.message.showLoadError(error);
    };

    var data = new FormData(form);

    window.backend.save(data, onLoad, onError);
  }

  function onFormReset(evt) {
    evt.preventDefault();

    window.map.setDisabled();
    toggleFieldsDisable(true);
    window.card.remove();
    window.pin.remove();
    window.mainPin.reset();
    window.mainPin.setAddress();
    window.data.adverts = [];
  }

  configureFields();
  toggleFieldsDisable(true);

  window.form = {
    setDisable: toggleFieldsDisable,
    setAddress: setAddress,
  };
})();
