/* eslint-disable no-console, func-names, no-var, import/no-extraneous-dependencies */
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var pug = require('pug');
var sleep = require('sleep');
var config = require('./webpack.client.express.config');
var uuid = require('node-uuid');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

server.app.use(bodyParser.json(null));
server.app.use(bodyParser.urlencoded({ extended: true }));

server.app.use('/', (_req, res) => {
  var locals = {
    props: JSON.stringify({ comments }),
  };
  var layout = `${process.cwd()}/index.pug`;
  var html = pug.compileFile(layout, { pretty: true })(locals);
  res.send(html);
});

server.listen(4000, 'localhost', (err) => {
  if (err) console.log(err);
  console.log('Listening at localhost:4000...');
});
