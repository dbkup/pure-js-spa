(function (app) {
  'use strict';
  app.logger = {
    log: log
  };

  function log(message) {
    if(window.console) {
      window.console.log(message);
    }
  }
})(window.clientSettingsApp);
