/**
 * amd 模块
 * define(id, export)
 */
define('framwork', function(require) {

    var $ = require('zepto');
    var FastClick = require('fastclick');
    var Affix = require('gallery/affix');
    var Touch = require('touch');

    $.fn.switchClass = function(){
        var that = $(this);
        $(this).on('click', function(){
            var active = $(this).attr('data-toggle');
            that.removeClass(active);
            $(this).toggleClass(active);
        })
    };
	
	FastClick.attach(document.body);

    $(document).ready(function(){
        /*-- 滚动激活 --*/
        $('[data-spy="affix"]').affix();
        /*-- 点击切换 --*/
        $('[data-toggle]').switchClass();

        /*-- 页面加载完，可添加动画 --*/
        $('html').addClass('domReady');

    	/*-- 滚定页脚 --*/
        var winH = $(window).height(),
            docH = $(document.body).height(),
            footerH = $('.footer').height();

        if(winH > docH + footerH) {
            $('.footer').addClass('footer-fixed')
        }
       
        /*-- banner动画 --*/
        $('.page-banner').addClass('active');

        /*-- 菜单 --*/
        var menuToggle = (function(){
            var menu = $('.navigator'), btn = $('.header-menu');
            return {
                show: function(){
                    $('html').addClass('menu-open');
                    menu.addClass('active');
                    btn.addClass('active');
                },
                hide: function(){
                    $('html').removeClass('menu-open');
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
        //$(document).on('click', $.proxy(menuToggle.hide, menuToggle));

        $(document).on('swipeLeft', function(){
            menuToggle.show();
        }).on('swipeRight', function(){
            menuToggle.hide();
        });
    });
})

seajs.use(['framwork']);