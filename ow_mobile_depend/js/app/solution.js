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
            docH = document.body.scrollHeight || document.documentElement.scrollHeight,
            navH = $nav.height(),
            scrollTop = 0,
            jump = false
            triggerIndex = 0;

        /* 锁定导航 */
        var fixedNav = function(){
            var st = $(window).scrollTop();
            if(st >= pos.top) {
                $solution.addClass('fixed');
            } else {
                $solution.removeClass('fixed');
            }
        };
        $(window).scrollTop(0,1).on('scroll.hidebanner', fixedNav)
        setInterval(fixedNav, 50);

        // ---- 滚动组合
        var oNav = $('.j-navigators a');
        $('.j-affix').affix({
            top:  navH + hH,
            after: function(obj){
                if(jump) return;
                // var id;
                // if(jump && triggerIndex >=0){
                //   id = triggerIndex;
                // }  else {
                //     id = obj[0].id;
                // }
               var id = obj[0].id, st = $(window).scrollTop();
                // if(st + winH >= docH) {
                //      id = oNav.eq(oNav.length - 1)[0].hash.replace(/#/g, '');
                // }
               // console.log(id);
               id && oNav.removeClass('active').filter('[href="#'+ id +'"]').addClass('active');
            }
        });
    
        // 获取hash
        var getHash = function(url) {
            var a = document.createElement('a');
            a.href = url;
            return a.hash;
        };

        /* 动画 */
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000 / 60)};
        function scrollAnim(h, dir, next) {
            var st = $(window).scrollTop(), speed = dir > 0 ? 50 : -50;
            if(h === st) return;
            st += speed;


            //if(scrollTop === st || (dir > 0 && st >= h) || (dir < 0 && st <= h) || docH - winH <= st) {
            // console.log(st + winH, docH);
            if(st == h || (dir > 0 && st >= h) || (dir < 0 && st <= h) || st + winH >= docH){
                $(window).scrollTop(h);
                

                next && typeof next ==="function" && next();
            } else {
                //$(window).scrollTop(st);
                window.scrollBy(0, speed);
                requestAnimationFrame(function(){
                    scrollAnim(h, dir, next);
                });
            }            

            // 页面最低部
            scrollTop = st;
        }

        /* 导航点击跳转 */
        oNav.on('click', function(e){
            var obj = $(getHash(e.currentTarget.href));
            // alert(jump)
            if(obj && !jump) {
                triggerIndex = $(this).index();
                jump = true;
                oNav.removeClass('active');
                $(this).addClass('active');
                var pos = obj.offset();
                var st = $(window).scrollTop();
                var dH = $(document).height();
                var distance =  pos.top - hH - navH;
                //$(window).scrollTop(distance);
                scrollAnim(distance, distance - st, function(){
                    jump = false;
                });
            }
            
            e.preventDefault();
            return false;
        })
    });
});