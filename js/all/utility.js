/**
 * grunt-boiler
 * all.js - utility.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
(function (WIN) {
  'use strict';

  WIN.Utility = {
    console: function(value) {
      value = value || null;
      console.log(value);
    }
  };

})(window);