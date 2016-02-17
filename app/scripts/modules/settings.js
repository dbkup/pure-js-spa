(function (app) {
  'use strict';
  var contentWrapper = document.getElementById('main-content'),
    // all the settings ui controls
    settingsElements = [],
    // container for buttons wrapper element
    settingsControlsWrapper = null,
    settingsConfirmationWrapper = null,
    confirmationTimeout = null,
    // delay confirmation notification
    confirmationDelay = 1200,
    hiddenClass = 'hidden';

  // module name must correspond to route name in routing.js
  app.modules.settings = {
    init: init,
    cleanup: cleanup
  };

  // close module
  function cleanup() {
    contentWrapper.removeEventListener('click', mainContentClicked);
    clearTimeout(confirmationTimeout);
  }

  // initialize module
  function init() {
    contentWrapper.addEventListener('click', mainContentClicked);
    settingsElements = document.getElementsByClassName('csa-control');
    settingsControlsWrapper = document.getElementById('csa-setting-controls');
    settingsConfirmationWrapper = document.getElementById('csa-setting-confirmation');

    updateUi(app.helpers.storageHelpers.loadState());
  }

  function mainContentClicked(event) {
    var element = event.target,
      nodeName = element.nodeName.toLowerCase();

    if (nodeName !== 'input' && nodeName !== 'a') {
      return;
    }

    switch (nodeName) {
      case 'input':
        var elementOption = app.helpers.elementHelpers.getData(element, 'setting-type');
        var changeDone = app.helpers.storageHelpers.configChanged(elementOption, element.checked);
        changeControlsVisibility(changeDone);
        break;
      case 'a':
        controlButtonClicked(element.id);
        break;
    }
  }

  function controlButtonClicked(buttonAction) {
    switch (buttonAction) {
      case 'cancelSettings':
        updateUi(app.helpers.storageHelpers.loadState());
        changeControlsVisibility(false);
        break;
      case 'confirmSettings':
        app.helpers.storageHelpers.saveState();
        changeControlsVisibility(false, true);
        break;
    }
  }

  function changeControlsVisibility(showControls, showSuccess) {
    if (settingsControlsWrapper) {
      if (showControls) {
        app.helpers.elementHelpers.removeClass(settingsControlsWrapper, hiddenClass);
        hideConfirmation();
      } else {
        app.helpers.elementHelpers.addClass(settingsControlsWrapper, hiddenClass);
        if(showSuccess) {
          toggleConfirmation();
        }
      }
    }
  }

  function hideConfirmation() {
    app.helpers.elementHelpers.addClass(settingsConfirmationWrapper, hiddenClass);
    clearTimeout(confirmationTimeout);
    confirmationTimeout = null;
  }

  function toggleConfirmation() {
    if(!confirmationTimeout) {
      app.helpers.elementHelpers.removeClass(settingsConfirmationWrapper, hiddenClass);
      confirmationTimeout = setTimeout(hideConfirmation, confirmationDelay);
    }
    else {
      hideConfirmation();
    }

  }

  function updateUi(settingsModel) {
    for (var i = 0, settingsNumber = settingsElements.length; i < settingsNumber; i++) {
      var setting = settingsModel[settingsElements[i].id];
      if (setting !== undefined) {
        settingsElements[i].checked = setting;
      }
    }
  }
})(window.clientSettingsApp);
