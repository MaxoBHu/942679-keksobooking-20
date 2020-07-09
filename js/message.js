'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorMessageButton = errorMessage.querySelector('.error__button');

  function showSuccessMessage() {
    main.appendChild(successMessage);
    successMessage.focus();
    document.addEventListener('keydown', onEscapeKeydown);
    successMessage.addEventListener('click', onSuccessMessageClick);
  }

  function hideSuccessMessage() {
    successMessage.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
  }

  function showErrorMessage() {
    main.appendChild(errorMessage);
    errorMessageButton.focus();
    document.addEventListener('keydown', onEscapeKeydown);
    errorMessage.addEventListener('click', onErrorMessageClick);
    errorMessageButton.addEventListener('click', onErrorMessageButtonClick);
  }

  function hideErrorMessage() {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onErrorMessageClick);
  }

  function onEscapeKeydown(evt) {
    if (window.utils.isEscapeEvent(evt)) {
      hideSuccessMessage();
      hideErrorMessage();
    }
  }

  function onSuccessMessageClick(evt) {
    if (window.utils.isMouseLeftButtonEvent(evt) && evt.target === successMessage) {
      hideSuccessMessage();
    }
  }

  function onErrorMessageClick(evt) {
    if (window.utils.isMouseLeftButtonEvent(evt) && evt.target === errorMessage) {
      hideErrorMessage();
    }
  }

  function onErrorMessageButtonClick(evt) {
    if (window.utils.isMouseLeftButtonEvent(evt)) {
      hideErrorMessage();
    }
  }

  successMessage.tabIndex = '1';

  window.message = {
    showLoadSuccess: showSuccessMessage,
    showLoadError: showErrorMessage,
  };
})();
