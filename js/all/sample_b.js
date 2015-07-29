/**
 * grunt-boiler
 * all.js - sample_b.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
(function (WIN) {
  'use strict';

  // run
  $(function () {
    sampleB.init();
  });

  // sample B module
  var  sampleB = {
    init: function () {
      WIN.Utility.console('B');
    }
  };

})(window);