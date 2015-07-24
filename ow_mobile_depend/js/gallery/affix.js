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
			top: window.innerHeight,
			after: function(){}
		};

		var winH = window.innerHeight,
			docH = document.body.scrollHeight || document.documentElement.scrollHeight;

		var config = $.extend(d, options || {}),
			handler = {
				getAttr: function(obj){
					if(!obj) return;
					return {
						active: obj.attr('data-active') || config.active,
						top: obj.attr('data-offset-top') || config.top
					}
				},
	        	show: function(obj){
	        		var cfg = this.getAttr(obj);
	        		obj.addClass(cfg.active);
	        		typeof config.after === "function" && config.after.call(null, obj);
	        	}
	        },
	        /*
			*判断元素是否出现在viewport中
			*/
			inViewport = (function(){
				var belowthefold = function (elem) {
					return elem.getBoundingClientRect().top < 0;
				};
				var abovethetop = function (elem) {
					return elem.getBoundingClientRect().top > window.innerHeight;
				};
				return function(elem){
					return !belowthefold(elem) && !abovethetop(elem); 
				}
			})();

		var collections = $(this).map(function(){
			return {
				obj: $(this),
				top: $(this).offset().top
			}
		});

		var i, len = collections.length;
		if(len > 0) {
			$(window).on('scroll.scrollspy', function(){
				var st = $(this).scrollTop();
				if(st + winH + config.top >= docH){
					handler.show(collections[len-1].obj);
					return;
				}
				if(st <= 0 || st < config.top) {
					handler.show(collections[0].obj);
					return;
				}
				//collections.forEach(function(model, index){
				for(i = len; i--;) {
					// if(collections[i + 1] == undefined) {
					// 	handler.show(collections[len - 1].obj);
					// }
					var model = collections[i];
					var attr = handler.getAttr(model.obj);
					var nextModel = collections[i + 1] ? collections[i + 1] : undefined;
					// if(model.top <= st + attr.top && inViewport(model.obj[0])) {
					// 	handler.show(model.obj);
					// 	return;
					// }
					//console.log(nextModel);

					if(st + attr.top >= model.top && (nextModel === undefined || st + attr.top < nextModel.top )) {
					// console.log(nextModel === undefined);
					// console.log(st, nextModel.top);
					console.log('-------');
					console.log(i, attr.top);
					console.log(st);
					console.log(model);
					console.log(nextModel)
					console.log('/-------')
						handler.show(model.obj);
					}
				}
				//})
			});
		}
		

		//console.log(collections);

		/*return $(this).each(function(){
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
	            var top = st + winH - config.top;
	            handler[top > offsetTop ? 'show' : 'hide']();
	        })
		})*/
		
	};

	return $.fn.affix;
});