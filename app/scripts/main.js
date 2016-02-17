(function (app) {
  'use strict';
  window.addEventListener('hashchange', viewChanged);

  window.addEventListener('DOMContentLoaded', function () {
    var navs = document.getElementsByClassName('csa-nav-element');

    if (navs.length > 0) {
      for (var i = 0, max = navs.length; i < max; i++) {
        navs[i].addEventListener('click', navItemClicked);
      }
    }

    // trigger view change for current page
    viewChanged();
  }, false);

  function loadModule(moduleName) {
    if (app.modules.activeModule) {
      if (app.modules.activeModule.name !== moduleName) {
        app.modules.activeModule.cleanup();
      }
    }

    app.modules.activeModule = app.modules[moduleName];
    app.modules.activeModule.init();
  }

  function loadPage(route) {
    app.helpers.requestHelpers.makeRequest({
      url: 'views/' + route.template,
      callback: function (err, data) {
        if (err) {
          return app.logger.log(err);
        }

        app.helpers.elementHelpers.updateElement('main-content', data);
        loadModule(route.name);
      }
    });
  }

  function navItemClicked(event) {
    var element = event.currentTarget,
      pageName = app.helpers.elementHelpers.getData(element, 'page-name');

    updateNavigationSelection(element);

    if (!pageName) {
      return;
    }

    window.location.hash = '#' + pageName;
  }

  function updateNavigationSelection(element) {
    var activeNavs = document.getElementsByClassName('csa-nav-element active');

    if (activeNavs.length > 0) {
      app.helpers.elementHelpers.removeClass(activeNavs.item(0), 'active');
    }

    // check if the element passed is actually an element
    // if not element it's a route string we need to find the element we need to change
    if (!app.helpers.elementHelpers.isValidElement(element)) {
      var navs = document.getElementsByClassName('csa-nav-element');
      for (var i = 0, max = navs.length; i < max; i++) {
        if (app.helpers.elementHelpers.getData(navs[i], 'page-name') === element) {
          element = navs[i];
          break;
        }
      }
    }

    app.helpers.elementHelpers.addClass(element, 'active');
  }

  function viewChanged() {
    var parsedHash = window.location.hash.substring(1),
      routeKeys = Object.keys(app.routes),
      routeInfo = app.routes.defaultRoute,
      isMatchedRoute = false;

    routeKeys.forEach(function (routeKey) {
      if (app.routes[routeKey].route === parsedHash) {
        routeInfo = app.routes[routeKey];
        isMatchedRoute = true;
      }
    });

    updateNavigationSelection(routeInfo.route);

    if (!isMatchedRoute) {
      return window.location.hash = '#' + routeInfo.route;
    }

    loadPage(routeInfo);
  }
})(window.clientSettingsApp);
