/**
 * amd 模块
 * define(id, export)
 */
define('framwork', ['zepto', 'layer/layer', 'fastclick'], function($, layer, FastClick) {
	
	FastClick.attach(document.body);

    $(document).ready(function(){
    	$('#J_loading').hide();
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
    })
})

require(['framwork']);