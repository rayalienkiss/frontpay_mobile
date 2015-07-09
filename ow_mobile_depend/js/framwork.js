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
            var hasClass = $(this).hasClass(active);
            that.removeClass(active);
            $(this)[hasClass ? 'removeClass' : 'addClass'](active);
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
            hH = $('.header').height(),
            docH = $(document.body).height(),
            footerH = $('.footer').height();

        if(winH > docH + footerH) {
            $('.footer').addClass('footer-fixed')
        }
       
        /*-- banner动画 --*/
        $('.page-banner').addClass('active');

        /*-- 菜单 --*/
        // $('.navigator').css({ 'height': winH+'px'});
        var menu = $('.navigator'), btn = $('.header-menu');
        menu.css({'height': winH+'px'});

        //$('body').css({'height': winH+'px'});
        var menuToggle = (function(){            
            return {
                open: false,
                st : 0,
                show: function(){
                    this.st = $(window).scrollTop();
                    this.open = true;
                    $(window).scrollTop(0);
                    //alert($(document).height())
                    $('body').css({'height': winH  +'px'}).addClass('menu-open');
                    $('.wrapper').css({'height': winH - hH - footerH +'px', 'overflow': 'hidden'});
                    menu.addClass('active');
                    btn.addClass('active');
                    //alert($('body').height())
                },
                hide: function(){
                    this.open = false;
                    $('body').css({'height': 'auto'}).removeClass('menu-open');
                    $('.wrapper').css({'height': 'auto', 'overflow': 'auto'});
                    menu.removeClass('active');
                    btn.removeClass('active');
                    $(window).scrollTop(this.st);
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
        //$(document).on('click', $.proxy(menuToggle.hide, menuToggle));\
        menu.on('click', $.proxy(menuToggle.hide, menuToggle))

        $(document).on('swipeLeft', function(){
            menuToggle.show();
        }).on('swipeRight', function(){
            if(menuToggle.open){ // 菜单打开，向右侧滑默认关闭菜单
                menuToggle.hide();
            } else { // 手势返回
                history.go(-1);
            }            
        });
    });
})

seajs.use(['framwork']);