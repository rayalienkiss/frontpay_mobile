/*!
 * 解决方案
 * amd 模块
 * define(id, export)
 */
define('app/industry', function(require) {

    //var Config = require('confing');
    var $ = require('zepto');
    var layer = require('layer/layer');
    var imgLoader = require('gallery/imgLoader');
    var Touch = require('touch');

    var Config = typeof webConfig == 'undefined' ? {"imgUrl": "ow_mobile_depend/images/solution/"} : webConfig;

    $(document).ready(function(){
       var $wrapper = $('.wrapper');
       var $banner = $('.solution-top');
       var bannerH = $banner.height();
       var viewW = window.innerWidth;
        var drag = true;
        var startY = 0, moveY = 0;

        var $txt1 = $banner.find('.solution-bg-txt1');
        var $txt2 = $banner.find('.solution-bg-txt2');
        var $txt3 = $banner.find('.solution-bg-txt3');
        var $bg = $banner.find('.solution-bg');

        var txt1Top = $txt1.position().top,
            txt2Top = $txt2.position().top,
            txt3Top = $txt3.position().top;

        var bannerMove = {
            to: function(y){
                $banner.css({'height': bannerH + y  + 'px'});
                $txt1.css({ 'top': txt1Top + y * 2.4 +'px'});
                $txt2.css({ 'top': txt2Top + y * 1.8 +'px'});
                $txt3.css({ 'top': txt3Top + y * 1.8 +'px'});
                $bg.css({'background-size': viewW * (1+ Math.abs(y / bannerH)) +'px auto' });
            },
            back: function(){
                $banner.css({'height': bannerH + 'px'});
                $txt1.css({ 'top': txt1Top +'px'});
                $txt2.css({ 'top': txt2Top +'px'});
                $txt3.css({ 'top': txt3Top +'px'});
                $bg.css({'background-size': '100% auto' });
            }
        };

        $banner.css({ 'padding-top': 0, 'height': bannerH+'px'});

        $banner.on('touchstart', function(e){
            if(!drag) return;
            startY = e.targetTouches[0].pageY;
            //e.stopPropagation();
        }).on('touchend', function(e){
            if(moveY < 0) {
                var st = $(window).scrollTop();
                st < 60 ? drag = true : drag = false;

               $(window).scrollTop(st - moveY);
               // 滚动条定时处理
               var timer = setInterval(function(){
                    var t = $(window).scrollTop();
                    // 到达banner高度时
                    if(t >= bannerH) {
                        clearInterval(timer);
                        bannerMove.back();
                        $(window).scrollTop(bannerH);
                    } else {
                        // 自滚动10px
                        window.scrollBy(0, 10)
                    }
               }, 1);               
            }

        }).on('touchmove', function(e){
            e.preventDefault();
            // 缩放或不是拖拽事件
            if(e.touches.length > 1 || e.scale && e.scale !== 1){
                return;
            }
            // 移动的高度
            moveY = e.changedTouches[0].pageY - startY;
            if(moveY < 0){ // 向上
                bannerMove.to(moveY);
            }             
        });

        $(window).on('scroll', function(){
            var st = $(this).scrollTop();
            st < 60 ? drag = true : drag = false;
        });

        // loading
        $('.loading').hide();
        var dialog = layer.open({
                type: 2,
                //shade: false,
                time: 9999999999,
                content: '<div id="loading-txt">0%</div>',
            }),
            oImgs = $('img[data-src]'), 
            imgs, 
            bgImgs, 
            loaded = 0;

            // 收集需要延迟的图片
            imgs = oImgs.map(function(index, elem) {
                return $(this).attr('data-src');
            });
            bgImgs = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg', 'banner6.jpg', 'banner7.jpg', 'logo-Commerce_sprite2.png'].map(function(img){
                return Config.imgUrl + img;
            });

            imgs = imgs.concat(bgImgs);

            // 加载完毕响应函数
            var imgReady = function(){

                // 关闭加载层
                layer.close(dialog);

                // 加载图片完毕
                $('.solution').addClass('solution-active');
                oImgs.attr('src', function(){
                    return $(this).attr('data-src');
                })
            };

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