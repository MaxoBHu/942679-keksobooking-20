'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var featuresContainer = filterForm.querySelector('.map__features');

  function setDisabled() {
    filterForm.reset();

    filters.forEach(function (field) {
      field.disabled = true;
    });

    featuresContainer.disabled = true;
  }

  function setEnabled() {
    filters.forEach(function (field) {
      field.disabled = false;
    });

    featuresContainer.disabled = false;
  }

  window.filter = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
