/**
 * amd 模块
 * define(id, export)
 */
define('framwork', ['jquery'], function($) {
    $(document).ready(function(){
        setTimeout(function(){
            $('#J_loading').fadeOut();
        }, 1000);
    })
})

require(['framwork']);