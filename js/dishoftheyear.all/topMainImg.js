/* global window, $, _, exports */

/**
* 今年の一皿2014 トップ メインビジュアルフェード
* dishoftheyear.all.js - topMainImg.js
* Author: sekiya
* ---------------------------------------------------------------------- */
exports.TopMainImg = (function (util) {
    'use strict';

    function TopMainImg() {
        this.init.apply(this, arguments);
    }

    var topmainimg = TopMainImg.prototype;
    topmainimg.init = function init() {
        
        // slideFade
        var slideFade = function () {
            // 初期設定
            var conf = {

                // スライド画像セレクタ表裏とも取得
                $img: [
                    $('#js-slideFront'),
                    $('#js-slideRear')
                ],

                // タイマー間隔秒数
                duration: 5000,

                // アニメーション秒数
                // CSSアニメーション設定（$ANIM_SLIDE_DUR）と同秒数を設定
                speed: 3000,

                // アニメーション再生回数の上限
                threshold: 100,

                // iterator 
                i: 0,

                // timer id
                timerSlide: null
            };

            // slideFadeの処理関数
            var slideFadeMain = function () {

                // タイマー処理の解除
                clearTimeout(conf.timerSlide);

                // 表側の画像に
                // アニメーションclass付与後に
                // フェードインアニメーション発火
                // ・cssアニメーション（IE10以上）
                if (!util.isUa('ieUnder9')) {
                    conf.$img[0]
                        .addClass('slide-animation')
                        .css('opacity', 1);
                }
                // ・IE9以下向けjQueryアニメーション
                else {
                    conf.$img[0]
                        .hide()
                        .removeClass('slide-animation')
                        .css('opacity', 1)
                        .fadeIn(1000);
                }

                // 現在のsrc属性値取得
                var imgSrc = [
                    conf.$img[0].attr('src'),
                    conf.$img[1].attr('src')
                ];

                // アニメーション終了後の処理
                setTimeout(function () {

                    // 裏側の画像のsrc属性値に表の画像のsrc属性値を代入
                    conf.$img[1].attr('src', imgSrc[0]);

                    // 表側の画像の
                    // アニメーションclassを解除後に
                    // 透過値を0に戻し
                    // 表の画像のsrc属性に裏の画像のsrc属性値を代入する
                    // （次のフェードインアニメーションのスタンバイ状態）
                    conf.$img[0]
                        .removeClass('slide-animation')
                        .css('opacity', 0)
                        .attr('src', imgSrc[1]);

                    // iterator繰り上げ
                    conf.i++;

                    // iteratorが上限値を超えたらループを解除しアニメーション停止
                    if (conf.i >= conf.threshold) return;

                    // ループ処理
                    conf.timerSlide = setTimeout(slideFadeMain, conf.duration);

                }, conf.speed);
            };

            // 初回アニメーション発火
            conf.timerSlide = setTimeout(slideFadeMain, conf.duration);

        };

        // init run on document ready
        $(function () {
            slideFade ();
        });
        
    };
    
    return TopMainImg;
    
})(exports.utility);