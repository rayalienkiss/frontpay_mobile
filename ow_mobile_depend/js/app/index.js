/*!
 * 首页
 * amd 模块
 * define(id, export)
 */
define('app/index', ['zepto', 'fullpage/zepto.fullpage'], function($, fullPage) {
	

    $(document).ready(function(){
        // 全屏轮播
        var pageLen = $('.screen-wrap .page').length;
        $('.screen-wrap').fullpage({
           // drag: true,
            start: 1,
            dir:'h',
            duration: 100,
            page: '.page',
            beforeChange: function(data){
                if(pageLen == data.next + 1) { // 最后一页
                    $('footer').removeClass('active');
                } else{
                    $('footer').addClass('active');
                }
            },
            afterChange: function(data) {
                if(pageLen == data.cur + 1) { // 最后一页
                    $('footer').addClass('active');
                } else{
                    $('footer').removeClass('active');
                }
            }
        });
    });
});