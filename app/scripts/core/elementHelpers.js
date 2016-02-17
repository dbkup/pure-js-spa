(function (app) {
  'use strict';
  app.helpers.elementHelpers = {
    addClass: addClass,
    hasClass: hasClass,
    isValidClassName: isValidClassName,
    removeClass: removeClass,
    isValidElement: isValidElement,
    updateElement: updateElement,
    getData: getData,
    isElementId: isElementId
  };

  // add class to element if the class is not already added
  function addClass(target, className) {
    if (hasClass(target, className)) {
      return;
    }
    if (target.classList) {
      target.classList.add(className);
    }
    else {
      target.className += ' ' + className;
    }
  }

  // get data from data-* attributes
  function getData(target, key) {
    if (target.dataset) {
      if (key.indexOf('-') > 0) {
        var keyParts = key.split('-');

        for (var i = 1, keyLength = keyParts.length; i < keyLength; i++) {
          keyParts[i] = keyParts[i][0].toUpperCase() + keyParts[i].substring(1);
        }

        key = keyParts.join('');
      }

      return target.dataset[key];
    }
    else {
      return target.getAttribute('data-' + key);
    }
  }

  // check if element has className in class list
  function hasClass(target, className) {
    if (!isValidElement(target) || !isValidClassName(className)) {
      return;
    }
    return target.classList ?
      target.classList.contains(className) :
    target.className.indexOf(className) >= 0;
  }

  function isElementId(target, id) {
    return isValidElement(target) && target.id === id;
  }

  // check if className is a valid string to put into element class list
  function isValidClassName(className) {
    return className && typeof className === 'string'
      && className.length !== 0 && !(/\s/.test(className));
  }

  // remove class from element class list
  function removeClass(target, className) {
    if (!hasClass(target, className)) {
      return;
    }
    if (target.classList) {
      target.classList.remove(className);
    }
    else {
      var classRegex = new RegExp(className);
      var classes = target.className.split(' ');
      for (var i = 0, classLength = classes.length; i < classLength; i++) {
        if (classRegex.test(classes[i])) {
          classes[i] = '';
        }
      }
      target.className = classes.join(' ').trim();
    }
  }

  // check we're working with a dom element
  function isValidElement(elem) {
    return !!elem && elem.nodeType === 1;
  }

  // simple update element contents function
  // not to be used with user inputs as it doesn't check for script or any other injections
  function updateElement(elem, contents) {
    if (!isValidElement(elem)) {
      elem = document.getElementById(elem);
    }

    elem.innerHTML = contents;
  }
})(window.clientSettingsApp);
