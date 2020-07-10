'use strict';

(function () {
  var container = document.querySelector('.map');
  window.map = {};

  function setDisabled() {
    window.map.disabled = true;
    window.filter.setDisabled();

    container.classList.add('map--faded');
  }

  function setEnabled() {
    window.map.disabled = false;
    window.filter.setEnabled();
    container.classList.remove('map--faded');
    window.data.generate(window.filter.setToAdverts);
    window.form.setDisable(false);
  }

  setDisabled();

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
