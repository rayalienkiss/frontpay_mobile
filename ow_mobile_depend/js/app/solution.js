/*!
 * 解决方案
 * amd 模块
 * define(id, export)
 */
define('app/solution', ['zepto', 'gallery/affix'], function($, Affix) {
    $(document).ready(function(){
        var $solution = $('.solution-header');
        var pos = $solution.position();
        var sH = $solution.height();
        var hH = $('.header').height();
        var docH = $(document).height();
        var winH = window.innerHeight;
        var bannerH = $('.page-banner').height();
        $solution.css({
            "top": hH + bannerH +"px"
        }).addClass('fixed');

        $('.main').css({ "padding-top": sH + bannerH +"px"});

        // ---- 滚动组合，有点凌乱，bug出没 -_-!!!
        var oNav = $('.j-navigators a');
        $('.j-affix').affix({
            after: function(obj){
                var id = obj[0].id;
                var pos = obj.position();
                var st = $(window).scrollTop();
                if(pos.top >= st + sH + bannerH + hH) {
                    oNav.removeClass('active').filter('[href="#'+ id +'"]').addClass('active');
                }
            }
        });

        var getHash = function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hash;
        };

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        function scrollAnim(h, dir) {
            var st = $(window).scrollTop(), speed = dir > 0 ? 50 : -50;
            if(h === st) return;
            st += speed;

            if((dir > 0 && st >= h) || (dir < 0 && st <= h) || docH - winH <= st) {
                $(window).scrollTop(h);
            } else {
                $(window).scrollTop(st);
                requestAnimationFrame(function(){
                    scrollAnim(h, dir);
                });
            }            
        }

        oNav.on('click', function(e){
            var obj = $(getHash(e.currentTarget.href));
            if(obj) {
                oNav.removeClass('active');
                $(this).addClass('active');
                var pos = obj.position();
                var st = $(window).scrollTop();
                var distance = pos.top - sH - bannerH - hH;
                scrollAnim(distance, distance - st);
            }
            
            e.preventDefault();
            return false;
        })
    });
});