/*!
 * 解决方案
 * amd 模块
 * define(id, export)
 */
define('app/industry', ['zepto', 'gallery/affix', 'fx', 'touch'], function($, Affix, Anim, Touch) {
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
    });
});