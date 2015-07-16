# frontpay_mobile
for mobile

* `output` 为生成输出
* `build` 构建工具目录
* `_layout` 模板框架目录
* `ow_mobile_depend` 静态资源开发目录

> 移交SVN给技术，只需提供`output`目录


## 构建

1. 安装gulp依赖模块，`build`目录在命令提示行中敲入`npm install`
2. `npm`包安装成功后，继续输入`gulp`启动任务
3. 浏览器自动启动服务，安装配置`livereload`插件可以浏览器自动刷新
4. 静态文件保存会自动编译，同时浏览器只需要刷新即可看到效果

## js模块化

* 采用`cmd`规范的`seajs`框架
* `DOM`选择了`zeptojs`框架

## 发布到SVN

从`github`拉取最新的源码，在`build`目录下修改`svnCongfig`的路径，修改为`svn`项目路径

在`build`的命令里使用`gulp publish` 执行发布任务,将自动复制`output`目录文件到`svn`项目路径