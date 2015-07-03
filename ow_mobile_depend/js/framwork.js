/**
 * amd 模块
 * define(id, export)
 */
define('framwork', ['zepto',  'fastclick', 'gallery/affix'], function($, FastClick, Affix) {

    $.fn.switchClass = function(){
        $(this).on('click', function(){
            var active = $(this).attr('data-toggle');
            //var hasClass = $(this).hasClass(active);
            //$(this)[hasClass ? 'addClass' : 'removeClass'](active);
            $(this).toggleClass(active);
        })
    };
	
	FastClick.attach(document.body);

    $(document).ready(function(){

        // 隐藏地址
        /*var self = document.getElementsByTagName('body')[0];
        if (self.requestFullscreen) {
            //html5新增的全屏方法
            self.requestFullscreen();
        } else if (self.mozRequestFullScreen) {
            //针对mozlia内核的hack
            self.mozRequestFullScreen();
        } else if (self.webkitRequestFullScreen) {
            //针对webkit内核的hack
            self.webkitRequestFullScreen();
        }*/
        /*if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {  
            var bodyTag = document.getElementsByTagName('body')[0];  
            bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';  
        }  
        setTimeout(function() {  
            window.scrollTo(0, 1)  
        }, 0); */

        $('[data-spy="affix"]').affix();
        $('[data-toggle]').switchClass();

        // 页面加载完，可添加动画
        $('html').addClass('domReady');

    	//$('#J_loading').hide();
        var winH = $(window).height(),
            docH = $(document.body).height(),
            footerH = $('.footer').height();
        if(winH > docH + footerH) {
            $('.footer').addClass('footer-fixed')
        }
       
        // banner动画
        $('.page-banner').addClass('active');

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
            e.preventDefault();
            return false;
        });
        $(document).on('click', $.proxy(menuToggle.hide, menuToggle));

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


    /*var $banner = $('.page-banner');
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
    }*/

})

// require(['framwork']);