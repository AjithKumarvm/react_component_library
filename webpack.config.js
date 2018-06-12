var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'mini_site_bundle');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [APP_DIR + '/lib/main.js',APP_DIR + '/scss/main.scss'],
  output: {
    path: BUILD_DIR+'/dist',
    filename: 'main.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module : {
    rules: [{
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
            presets: ['es2015', 'react','stage-3']
        }
      },{
        test: /\.scss$|\.css$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader",
            options: {
                    sourceMap: true
            } // translates CSS into CommonJS
        }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            } // compiles Sass to CSS
        }]
    }]
  }
};

module.exports = config;
