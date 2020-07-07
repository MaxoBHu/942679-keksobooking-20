'use strict';

(function () {
  var container = document.querySelector('.map');

  function setDisabled() {
    window.map.disabled = true;
    window.filter.setDisabled();

    container.classList.add('map--faded');
  }

  function setEnabled() {
    window.map.disabled = false;
    container.classList.remove('map--faded');
    window.data.generate();
    window.pin.render(window.data.adverts);
    window.form.setDisable(false);
  }

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
