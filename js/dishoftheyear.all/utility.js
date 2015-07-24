/* global window, $, _, exports */

/**
* 今年の一皿2014 共通ユーティリティ
* dishoftheyear.all.js - utility.js
* Author: sekiya
* ---------------------------------------------------------------------- */
exports.utility = (function () {
    'use strict';
    
    /**
    * exports.utility.isUa
    *
    * userAgentチェック
    *
    * 'ieUnder9' : IE9以下
    *
    */
    var isUa = function (rule) {
        var ua = window.navigator.userAgent.toLowerCase();        
        var isIe = /msie/.test(ua);
        var versionIe = (isIe)? parseFloat(ua.slice(ua.indexOf('msie') + 4)): null;
        switch (rule) {
            case 'ieUnder9':
                return (isIe && versionIe <= 9);
                break;
            default:
                break;
        }
    };
    return {
        isUa: isUa
    };
    
    
})();