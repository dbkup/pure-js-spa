(function (app) {
  'use strict';
  app.helpers.objectHelpers = {
    assign: assign
  };

  // simple shalow copy of object properties
  function assign(dst, src) {
    if (!dst || typeof dst !== 'object' || !src || typeof src !== 'object') {
      return;
    }

    Array.prototype.forEach.call(Object.getOwnPropertyNames(src), function (item) {
      dst[item] = src[item];
    });
  }
})(window.clientSettingsApp);
