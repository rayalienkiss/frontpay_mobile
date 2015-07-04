/**
 * Affix 滚动定位
 * @author: tommyshao <jinhong.shao@frontpay.cn>
 * @group:  paywefrontside
 * @date:   2015-06-27
 */
define('gallery/affix', function(require){

	var $ = require('zepto');

	$.fn.affix = function(options){
		var d = {
			active: 'active',
			repeat: 0,
			top: 0,
			bottom: 0,
			after: function(){}
		};

		return $(this).each(function(){
			var that = $(this);
			var config = $.extend(d, options || {});
	        var offsetTop = that.position().top;
	        var winH = window.innerHeight;
	        var docH = document.documentElement.innerHeight;

	        // 参数
	        config.active = that.attr('data-active') || config.active;
	        config.repeat = that.attr('data-repeat') || config.repeat;
	        config.top    = that.attr('data-offset-top') || config.top;
	        config.bottom = that.attr('data-offset-bottom') || config.bottom;

	        var handler = {
	        	show: function(){
	        		that.addClass(d.active);
	        		typeof config.after === "function" && config.after.call(null, that);
	        	},
	        	hide: function() {
	        		config.repeat && that.removeClass(d.active);
	        	}
	        };

	        $(window).on('scroll.affix', function(){
	            var st = $(this).scrollTop();
	            if(config.top > 0){
	            	handler[st > config.top ? 'show' : 'hide'](st);
	            	return;
	            }
	            if(config.bottom > 0){
	            	handler[st + winH > docH - config.bottom ? 'show' : 'hide']();
	            	return;
	            }
	            handler[st + winH - config.top > offsetTop ? 'show' : 'hide']();
	        })
		})
	};

	return $.fn.affix;
});