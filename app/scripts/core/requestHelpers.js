(function (app) {
  'use strict';
  app.helpers.requestHelpers = {
    makeRequest: makeRequest
  };

  function makeRequest(options) {
    var httpRequest = null;

    ajaxRequest(options);

    function ajaxRequest(requestOptions) {
      if (typeof requestOptions !== 'object' || !requestOptions.url || requestOptions.url.length === 0) {
        return Error('Invalid request object');
      }

      var config = {
        method: 'GET',
        callback: function (err, data) {
          app.logger.log('callback');
          app.logger.log(err || data);
        }
      };

      app.helpers.objectHelpers.assign(config, requestOptions);

      httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = finishRequestAndApplyCallback(config.callback);
      httpRequest.open(config.method, config.url);
      httpRequest.send();
    }

    function finishRequestAndApplyCallback(callback) {
      return function () {
        try {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              callback(null, httpRequest.responseText);
            }
            else {
              app.logger.log('error on request: ' + httpRequest.status);
            }
          }
        }
        catch (exc) {
          app.logger.log(exc);
          callback(exc);
        }
      };
    }
  }
})(window.clientSettingsApp);
