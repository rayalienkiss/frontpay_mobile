#!/usr/bin/env node
var os = require('os');
var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var argv = require("minimist")(process.argv.slice(2), {
  alias: {
    'silent': 's',
    'port': 'p',
    'hostname': 'h',
    'dir': 'd'
  },
  string: ['port', 'hostname'],
  boolean: 'silent',
  'default': {
    'port': 8000,
    'dir': process.cwd()
  }
});

var getIPAddress = require('./getIPAddress')
var autoBrowser = require('./autoBrowser')

if (argv.help) {
  console.log("Usage:");
  console.log("  anywhere --help // print help information");
  console.log("  anywhere // 8000 as default port, current folder as root");
  console.log("  anywhere 8888 // 8888 as port");
  console.log("  anywhere -p 8989 // 8989 as port");
  console.log("  anywhere -s // don't open browser");
  console.log("  anywhere -h localhost // localhost as hostname");
  console.log("  anywhere -d /home // /home as root");
  process.exit(0);
}


var Server = function(dir, port){
  var app = connect();
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  app.use(serveStatic(dir, {'index': ['index.html']}));
  app.use(serveIndex(dir, {'icons': true}));

  // anywhere 8888
  // anywhere -p 8989
  // anywhere 8888 -s // silent
  // anywhere -h localhost
  // anywhere -d /home
  var port = port || argv._[0] || argv.port;
  var hostname = argv.hostname || getIPAddress();


  app.listen(port, function () {
    // 忽略80端口
    port = (port != '80' ? ':' + port : '');
    var url = "http://" + hostname + port + '/';
    console.log("Running at " + url);
    if (!argv.silent) {
      //openURL(url);
      autoBrowser(url);
    }
  });
};

module.exports = Server;