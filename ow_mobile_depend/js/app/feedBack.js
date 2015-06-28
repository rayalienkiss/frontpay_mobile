/*!
 * 反馈留言
 * amd 模块
 * define(id, export)
 */
define('app/feedBack', ['zepto', 'layer/layer'], function($, dialog) {
	

    $(document).ready(function(){
        dialog.open({
                title: '提示',
                content: '你是想确认呢，还是想取消呢？',
                btn: ['确认', '取消'],
                shadeClose: false,
                yes: function(){
                    dialog.open({content: '你点了确认', time: 1});
                }, no: function(){
                    dialog.open({content: '你选择了取消', time: 1});
                }
            });
        $('.j-submit').on('click', function(){
            dialog.open({
                title: '提示',
                content: '你是想确认呢，还是想取消呢？',
                btn: ['确认', '取消'],
                shadeClose: false,
                yes: function(){
                    dialog.open({content: '你点了确认', time: 1});
                }, no: function(){
                    dialog.open({content: '你选择了取消', time: 1});
                }
            });
        })
    });
});