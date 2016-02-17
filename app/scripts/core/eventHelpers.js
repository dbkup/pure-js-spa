(function (app) {
  'use strict';
  app.helpers.eventHelpers = {
    safeCreateEvent: safeCreateEvent
  };

  function safeCreateEvent(name, options) {
    var event = null;
    if (typeof CustomEvent === 'function') {
      event = new CustomEvent(name, options);
    }
    else {
      event = document.createEvent('Event');
      event.initEvent(name, true, true);
    }
    return event;
  }
})(window.clientSettingsApp);
