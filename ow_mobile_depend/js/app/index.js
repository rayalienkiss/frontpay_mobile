/*!
 * 首页
 * amd 模块
 * define(id, export)
 */
define('app/index', function(require) {
    var $ = require('zepto');
    var fullPage = require('fullpage/zepto.fullpage');
    var layer = require('layer/layer');
    var imgLoader = require('gallery/imgLoader');
    var Touch = require('touch');
    var objScreen = $('.screen-wrap');

    var Config = typeof webConfig == 'undefined' ? {"imgUrl": "ow_mobile_depend/images/index/"} : webConfig;

    $(document).ready(function(){
        var winH = window.innerHeight;
        

        // loading
        $('.loading').hide();


        var dialog = layer.open({
            type: 2,
            //shade: false,
            time: 9999999999,
            content: '<div id="loading-txt">页面加载中…</div>',
        });

        var imgs, loaded = 0;

        // 收集需要延迟的图片
        imgs = ['txt_sprite.png','L1.jpg', 'L2.jpg', 'L3.jpg', 'L4.jpg', 'L5.jpg'].map(function(img){
            return Config.imgUrl + img;
        });

        // 加载完毕响应函数
        var imgReady = function(){

            // 关闭加载层
            layer.close(dialog);

            // 加载图片完毕
            $('.screen').addClass('active');
            // oImgs.attr('src', function(){
            //     return $(this).attr('data-src');
            // })

            // 全屏轮播
            var objPages = objScreen.find('.page');
            var pageLen = objPages.length;
            objScreen.fullpage({
               // drag: true,
                //start: 2,
                // loop: true,
                //dir:'h',
                duration: 100,
                page: '.page',
                afterChange: function(data) {
                    if(pageLen == data.cur + 1) { // 最后一页
                        $('.start').addClass('end');
                        // 最后一页，向下展现页脚
                        objPages.eq(data.cur).one('swipeUp', function(){
                             $('footer').addClass('active');
                        }).one('swipeDown', function(e) {
                            $('footer').removeClass('active');
                            e.stopPropagation();
                        });
                    } else{
                        $('.start').removeClass('end');
                    }
                }
            });
        };

        $('.start').on('click', function(){
            $.fn.fullpage.moveNext(true);
        });

        // 图片延迟加载
        imgLoader(imgs, function(url, index, len){
            loaded++;
            $('#loading-txt').html(parseInt(loaded * 100 / len) + '%');
            if(loaded >= len) {
                imgReady();
            }
        });
    });
});