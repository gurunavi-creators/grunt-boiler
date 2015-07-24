/* global window, $, _, exports */

/**
* 今年の一皿 2014
* dishoftheyear.all.jsの各処理を出し分ける
* ---------------------------------------------------------------------- */
(function (
    TopMainImg,
    ReportSlideImg
) {
    'use strict';
    
    function main() {
        
        // トップ メインビジュアルフェード の実行
        if($('#js-slideFront').length > 0) {
            new TopMainImg();
        }

        // 発表会の様子 画像スライド の実行
        if($('#js-modRepImg').length > 0) {
            new ReportSlideImg();
        }
        
        
    }
    
    main();
})(
    exports.TopMainImg,
    exports.ReportSlideImg
);
