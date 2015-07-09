/*!
 * 解决方案
 * amd 模块
 * define(id, export)
 */
define('app/solution', function(require) {
    var $ = require('zepto');
    var Affix = require('gallery/affix');

    $(document).ready(function(){
        var $solution = $('.solution-header'),
            $nav = $('.j-navigators'),
            pos = $solution.position(),
            winH = $(window).height(),
            hH = $('.header').height(),
            docH = $(document).height(),
            navH = $nav.height(),
            scrollTop = 0;

        /* 锁定导航 */
        var fixedNav = function(){
            var st = $(window).scrollTop();
            if(st >= pos.top) {
                $solution.addClass('fixed');
            } else {
                $solution.removeClass('fixed');
            }
        };
        $(window).on('scroll.hidebanner', fixedNav);
        setInterval(fixedNav, 50);

        // ---- 滚动组合
        var oNav = $('.j-navigators a');
        $('.j-affix').affix({
            top:  winH * 0.6,
            after: function(obj){
                var id = obj[0].id;
                oNav.removeClass('active').filter('[href="#'+ id +'"]').addClass('active');
            }
        });
    
        // 获取hash
        var getHash = function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hash;
        };

        /* 动画 */
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        function scrollAnim(h, dir) {
            var st = $(window).scrollTop(), speed = dir > 0 ? 50 : -50;
            if(h === st) return;
            st += speed;


            if(scrollTop === st || (dir > 0 && st >= h) || (dir < 0 && st <= h) || docH - winH <= st) {
                $(window).scrollTop(h);
            } else {
                $(window).scrollTop(st);
                requestAnimationFrame(function(){
                    scrollAnim(h, dir);
                });
            }            

            // 页面最低部
            scrollTop = st;
        }

        /* 导航点击跳转 */
        oNav.on('click', function(e){
            var obj = $(getHash(e.currentTarget.href));
            if(obj) {
                oNav.removeClass('active');
                $(this).addClass('active');
                var pos = obj.position();
                var st = $(window).scrollTop();
                var dH = $(document).height();
                var distance =  pos.top - hH - navH;
                //$(window).scrollTop(distance);
                scrollAnim(distance, distance - st);
            }
            
            e.preventDefault();
            return false;
        })
    });
});