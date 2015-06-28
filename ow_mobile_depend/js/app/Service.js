/*!
 * 服务
 * amd 模块
 * define(id, export)
 */
define('app/Service', ['zepto'], function($) {
    $(document).ready(function(){
        var oThumb = $('.thumb-list');
        var offsetTop = oThumb.position().top;
        var winH = window.innerHeight;
        $(window).on('scroll', function(){
            var st = $(this).scrollTop();
            if(st + winH > offsetTop) {
                $('.thumb-list').addClass('thumb-active')
            } else{
                // 不重复动作请注释以下这句
                $('.thumb-list').removeClass('thumb-active')
            }
        })
    });
});