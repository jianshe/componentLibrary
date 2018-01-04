# componentLibrary
一个使用jquery、zepto封装的组件库，方便后期查阅和使用


环境搭建安装说明：

1.安装 ruby 并配置环境变量.
2.安装 node.js.
3.查看源：gem source -l
  添加源：gem source -a https://ruby.taobao.org/
  移除源：gem source -r http://rubygems.org/
  gem install json compass compass-normalize sass

4.安装依赖包.
  npm install -g grunt-cli
  npm install -g tmodjs
  npm install -g requirejs

5.切换到项目的static目录下执行安装.
npm install grunt grunt-tmod grunt-contrib-concat grunt-contrib-jshint grunt-contrib-uglify grunt-contrib-watch grunt-contrib-requirejs grunt-contrib-compass grunt-contrib-copy grunt-contrib-clean --save-dev --registry=https://registry.npm.taobao.org 

6.前端开发调试安装.
Http-Server:    npm install -g http-server



