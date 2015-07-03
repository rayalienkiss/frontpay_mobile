/*!
 * 解决方案
 * amd 模块
 * define(id, export)
 */
define('app/industry', ['Config', 'zepto', 'gallery/affix', 'layer/layer', 'gallery/imgLoader'], function(Config, $, Affix, layer, imgLoader) {
    $(document).ready(function(){
       var $banner = $('.solution-top');
       var bannerH = $banner.height();
        var drag = false;
        var startX = 0, startY = 0;

        /*$banner.on('touchstart', function(e){
            drag = true;
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;

            e.stopPropagation();
        }).on('touchend', function(e){
            drag = false;
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;

            $window.scrollTop(bannerH);

            e.stopPropagation();
        }).on('touchmove', function(e){
            drag = true;
            var y = e.changedTouches[0].pageY - startY;
            var x = e.changedTouches[0].pageX - startX;
            e.stopPropagation();
        });*/
        /*$banner.on('touchstart', function(e){
            console.log(e);
        })
        $banner.on('swipeUp', function(e) {
            drag = true;
            alert(e);
            e.stopPropagation();
        });*/

        $(document).on('swipeUp', function(e) {
            drag = true;
            $window.scrollTop(bannerH);
            e.preventDefault();
        });

        // loading
        $('.loading').hide();
        var dialog = layer.open({
                type: 2,
                //shade: false,
                time: 9999999999,
                content: '<div id="loading-txt">页面加载中…</div>',
            }),
            oImgs = $('img[data-src]'), 
            imgs, 
            bgImgs, 
            loaded = 0;

            // 收集需要延迟的图片
            imgs = oImgs.map(function(index, elem) {
                return $(this).attr('data-src');
            });
            bgImgs = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg', 'banner6.jpg', 'banner7.jpg'].map(function(img){
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