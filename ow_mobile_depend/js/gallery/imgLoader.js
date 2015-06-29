/*!
 * 图片加载器
 */
define('gallery/imgLoader', function(){
	 var loadImage = function (path, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }

    var imgLoader = function (imgs, callback) {
        var len = imgs.length, i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function (path) {
                callback(path, ++i, len);
            })
        }
    }

    return imgLoader;
});