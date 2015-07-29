/**
 * grunt-boiler
 * all.js - sample_a.js
 * Author: sekiya
 * ---------------------------------------------------------------------- */
(function (WIN) {
  'use strict';
  
  // run
  $(function () {
    sampleA.init();
  });
  
  // sample A module
  var  sampleA = {
    init: function () {
      WIN.Utility.console('A');
    }
  };

})(window);