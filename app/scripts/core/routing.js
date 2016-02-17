// application routing configuration
// each property in the routes object is a module in the application
// template: html partial to be loaded
// route: url hash
// name: route module name, if there is a corresponding module it will be called with this name
(function (app) {
  'use strict';
  app.routes = {
    account: {
      template: 'account.html',
      route: 'account',
      name: 'account'
    },
    profile: {
      template: 'profile.html',
      route: 'profile',
      name: 'profile'
    },
    settings: {
      template: 'settings.html',
      route: 'settings',
      name: 'settings'
    },
    init: function () {
      // set default route to accounts page
      this.defaultRoute = this.account;
      return this;
    }
  }.init();
})(window.clientSettingsApp);
