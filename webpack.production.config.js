var webpack = require('webpack');
var path = require('path');
var request = require('request');

var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var APP_DIR = path.resolve(__dirname, 'src');
var bundleVersion = Date.now();
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "styles.min.css",
    disable: false
});

var config = {
  entry: [APP_DIR + '/lib/main.js'],
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: "css-loader!sass-loader",
        })
      }]
  },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.min.css',
        allChunks: true,
        disable:false
      }),
      // new S3Plugin({
      //   // Only upload css and js
      //   include:/.*\.(css|js)/,
      //   // s3Options are required
      //   s3Options: {
      //     accessKeyId: 'XXXXX',
      //     secretAccessKey: 'XXXX',
      //     region:'ap-southeast-1'
      //   },
      //   s3UploadOptions: {
      //     Bucket: 'link/'+bundleVersion
      //   }
      // }),
      function() {
        this.plugin("done", function(stats) {
          console.log('LIVE BUNDLE VERSION',bundleVersion);
        });
      },
    ]
};

module.exports = config;
