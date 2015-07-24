/* global window, $, _, exports */

/**
* 今年の一皿2014 発表会の様子 画像スライド
* dishoftheyear.all.js - reportSlideImg.js
* Author: sekiya
* ---------------------------------------------------------------------- */
exports.ReportSlideImg = (function (util) {
    'use strict';

    function ReportSlideImg() {
        this.init.apply(this, arguments);
    }

    var reportslideimg = ReportSlideImg.prototype;
    reportslideimg.init = function init() {
        
        // slideImg
        var slideImg = function () {

            // 初期設定
            var conf = {

                // セレクタ取得
                $mod: $('#js-modRepImg'),// モジュール全体
                $thumb: $('#js-repThumb li'),// サムネ
                $img: $('#js-repImg'),// メイン画像
                $txt: $('#js-repCap'),// キャプション

                // タイマー間隔秒数
                duration: 5000,

                // タイマー再始動秒数
                durationReplay: 10000,

                // timer id
                timerSlide: null

            };


            // キャプション原稿
            var txt = [
                // 1
                '左から滝久雄、杉本敬三氏、徳永純司氏、山口靖氏、塚本勝巳氏、道場六三郎氏、小山薫堂氏。中央と右端の書は、いずれも道場氏によるもの。',
                // 2
                '2014年の「今年の一皿」として選定された「ジビエ料理」を、書にしたためる道場六三郎氏',
                // 3
                '記者発表会には、テレビ、雑誌など多くのメディアが来場し、関心の高さを伺わせた。',
                // 4
                '蝦夷小鹿の赤ワイン煮込み<br>ちりめんキャベツのカネロニ仕立て',
                // 5
                '農林水産省食料産業局の山口靖氏は「世界に向かって、日本のジビエ料理を発信したい」と語った。',
                // 6
                '料理しにくいと言われる鹿の前足を使ったジビエ料理を披露し、レシピなどを解説する杉本敬三シェフ（左から2人目）。',
                // 7
                '夏の風物詩で、職人の技が光るかき氷に、2014年は高級感と独創性を加えたものが多く登場。<br>その注目の大きさから選定。ピンクのドン・ペリニヨンを使ったかき氷を作ったザ・リッツカールトン東京の徳永純司氏が喜びを語った。',
                // 8
                '乱獲と不漁による危機にあえぐニホンウナギ。「絶滅危惧種」に指定された節目の年に、うなぎを守る想いを込めて選定。日本大学教授の塚本勝巳氏は、ニホンウナギを襟を正してゆっくり楽しむ「ハレの日うなぎ」を提案した。'
            ];


            // main img preload
            var mainImg = [
                '../img/2014/img_repSlide01.jpg',
                '../img/2014/img_repSlide02.jpg',
                '../img/2014/img_repSlide03.jpg',
                '../img/2014/img_repSlide04.jpg',
                '../img/2014/img_repSlide05.jpg',
                '../img/2014/img_repSlide06.jpg',
                '../img/2014/img_repSlide07.jpg',
                '../img/2014/img_repSlide08.jpg'
            ];
            for (var i = 0, leng = mainImg.length; i < leng; i++) {
                var newImg = new Image();
                newImg.src = mainImg[i];
            }


            // thumbのマウスオーバー時の処理内容
            var overThumb = function () {

                // タイマー処理の解除
                clearTimeout(conf.timerSlide);

                // マウスオーバーされたサムネのindex値
                var index = $('#js-repThumb li').index(this);

                // current classを持つサムネのindex値
                var indexCur = $('#js-repThumb li').index($('#js-repThumb li.current'));

                // サムネがすでにcurrentの場合に処理離脱
                if (index === indexCur) return;

                // 差し替え制御
                setSlideMain (index);

            };


            // タイマー制御時の処理内容
            var slideImgMain = function () {

                // タイマー処理の解除
                clearTimeout(conf.timerSlide);

                // current classを持つサムネのindex値
                var indexCur = $('#js-repThumb li').index($('#js-repThumb li.current'));

                // 次にcurrentに設定するindex値
                var indexNext = (indexCur < $('#js-repThumb li').length - 1)? indexCur + 1: 0;

                // 差し替え制御
                setSlideMain (indexNext);

                // ループ処理
                conf.timerSlide = setTimeout(slideImgMain, conf.duration);
            };


            // 差し替え制御
            var setSlideMain = function (index) {

                // カレント表示の移動
                setThumbCurrent (index);

                // メイン画像のパス生成
                var src = '../img/2014/img_repSlide0' + (index + 1) + '.jpg';

                // メイン画像アニメーション
                fadeMainImg (src);

                // キャプション差し替え
                conf.$txt.html(txt[index]);

            };


            // カレント表示の移動処理
            var setThumbCurrent = function (index) {

                // 全サムネのカレント解除
                $('#js-repThumb li').removeClass('current');

                // 指定サムネ１つをカレント表示
                $('#js-repThumb li').eq(index).addClass('current');

            };


            // メイン画像アニメーション処理
            var fadeMainImg = function (src) {

                // 画像のフェードインアニメーションの準備
                // IE9以下ではアニメーションなし画像切替
                conf.$img
                    .removeClass('slide-animation')
                    .css('opacity', 0)
                    .attr('src', src);

                // 画像のフェードインアニメーション発火
                setTimeout(function () {
                    conf.$img
                        .addClass('slide-animation')
                        .css('opacity', 1);
                }, 0);

            };


            // thumbのマウスオーバーイベント設定
            conf.$mod.on('mouseover', '#js-repThumb li', overThumb);


            // thumbのマウスアウトイベント設定
            conf.$mod.on('mouseout', '#js-repThumb li', function () {

                // アニメーション再始動
                conf.timerSlide = setTimeout(slideImgMain, conf.durationReplay);

            });


            // 初回アニメーション発火
            conf.timerSlide = setTimeout(slideImgMain, conf.duration);

        };


        // init run on document ready
        $(function () {
            slideImg ();
        });
        
    };
    
    return ReportSlideImg;
    
})(exports.utility);