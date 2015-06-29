/*!
 * 反馈留言
 * amd 模块
 * define(id, export)
 */
define('app/feedBack', ['zepto', 'layer/layer', 'imagelazyloader'], function($, dialog, imagelazyloader) {
	
    $(document).ready(function(){
        $('#j-submit').on('click', function(){
            $('#j-fb-form').submit();
        })

        $('#j-fb-form').on('submit', function(e) {

            $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'post',
                dataType: 'json',
                success: function(res){
                    if(res.status == 1) {
                        dialog.open({
                                title: '提示',
                                content: '你是想确认呢，还是想取消呢？',
                                btn: ['确认'],
                                shadeClose: false,
                                yes: function(){
                                    // 页面调整
                                    location.href = "/";
                                }
                        });
                    } else {
                        dialog.open({
                            title: '提示',
                            content: res.msg
                        });
                    }
                },
                error: function(res){
                    dialog.open({
                        title: '提示',
                        content: res.responseText
                    });
                }
            });

            e.preventDefault();
        })
    });
});