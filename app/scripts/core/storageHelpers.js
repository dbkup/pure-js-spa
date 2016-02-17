(function (app) {
  'use strict';
  var defaultConfig = {
      launchMinimized: false,
      launchOnStart: false
    },
    loadedState = {},
    storageName = 'settingsConfig',
    currentState = {};

  app.helpers.storageHelpers = {
    saveState: saveState,
    loadState: loadState,
    configChanged: configChanged
  };

  // return true if control has changed the state from saved
  function configChanged(option, state) {
    currentState[option] = state;
    return isModified();
  }

  // is current state different than one loaded from localStorage
  function isModified() {
    var changed = false;
    var keys = Object.keys(currentState);
    for (var i = 0, stateNumber = keys.length; i < stateNumber; i++) {
      if (currentState[keys[i]] !== loadedState[keys[i]]) {
        changed = true;
        break;
      }
    }
    return changed;
  }

  function loadState() {
    var rawConfig = localStorage.getItem(storageName);

    app.helpers.objectHelpers.assign(currentState, rawConfig ? JSON.parse(rawConfig) : defaultConfig);
    app.helpers.objectHelpers.assign(loadedState, currentState);

    return currentState;
  }

  function saveState() {
    app.helpers.objectHelpers.assign(loadedState, currentState);
    localStorage.setItem(storageName, JSON.stringify(currentState));
  }
})(window.clientSettingsApp);
