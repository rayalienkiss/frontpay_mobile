/**
 * amd 模块
 * define(id, export)
 */
define('framwork', ['zepto', 'layer/layer', 'fastclick', 'fullpage/zepto.fullpage'], function($, layer, FastClick, fullPage) {
	
	FastClick.attach(document.body);

    $(document).ready(function(){
    	//$('#J_loading').hide();

        // 菜单
        var menuToggle = (function(){
            var menu = $('.navigator'), btn = $('.header-menu');
            return {
                show: function(){
                    menu.addClass('active');
                    btn.addClass('active');
                },
                hide: function(){
                    menu.removeClass('active');
                    btn.removeClass('active');
                }
            }
        })();
        $('.header-menu').on('click', function(e){
            var isActive = $('.navigator').hasClass('active');
            menuToggle[isActive ? 'hide' : 'show']();
            e.stopPropagation();
        });
        $(document).on('click', $.proxy(menuToggle.hide, menuToggle));

        // 全屏轮播
        
        $('.screen-wrap').fullpage({
           // drag: true,
            start: 1,
            dir:'h',
            duration: 100,
            page: '.page'
        });

        /*setTimeout(function(){
            $('#J_loading').hide();

            layer.open({
			    content: '你是想确认呢，还是想取消呢？',
			    btn: ['确认', '取消'],
			    shadeClose: false,
			    yes: function(){
			        layer.open({content: '你点了确认', time: 1});
			    }, no: function(){
			        layer.open({content: '你选择了取消', time: 1});
			    }
			});
        }, 300);*/
    });


    var $banner = $('.page-banner');
    var drag = false;
    var startX = 0, startY = 0;

    $banner.on('touchstart', function(e){
    	drag = true;
    	startX = e.targetTouches[0].pageX;
    	startY = e.targetTouches[0].pageY;
    }).on('touchend', function(e){
    	drag = false;
    	startX = e.changedTouches[0].pageX;
    	startY = e.changedTouches[0].pageY;
    }).on('touchmove', function(e){
    	var y = e.changedTouches[0].pageY - startY;
        var x = e.changedTouches[0].pageX - startX;

        move($banner, x, y);
    })

    $(document).on('touchmove', function(e) {
        drag && e.preventDefault();
    });

    function move($ele, dir, dist) {
        var translate =  'translateY';
        $ele.css({'-webkit-transform':translate + '(' + dist + 'px)','transform':translate + '(' + dist + 'px)'});
    }

})

require(['framwork']);