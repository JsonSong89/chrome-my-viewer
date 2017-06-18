const {join, resolve} = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');
const isPro = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

let entries = {empty: join(__dirname, "/src/empty.ts")};
let chunks = [];

//如果配置了target 则编译时只会编译这一个page
// getEntriesAndChunks();
let config = {
  entry: {
    initPageApp: join(__dirname, "/src/initPageApp.ts")
  },
  output: {
    path: resolve(__dirname, './dist/chrome'),
    filename: 'scripts/[name].js',
    publicPath: '/'
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    extensions: ['.vue', '.ts', '.tsx', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      src: join(__dirname, '/src'),
      source: join(__dirname, '/src/source'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules')
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules|vue\/src/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            isolatedModules: true
          }
        }]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', "stage-3"]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000,
            name: "images/[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'scripts/vendors.js',
      chunks: ["jquery", "lodash", "vue", "axios"],
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'styles/main.css',
      allChunks: true
    }),
    new WriteFilePlugin({
      test: /initPageApp.js/,
      useHashIndex: false
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 4051,
    historyApiFallback: false,
    // noInfo: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    },
  },
  devtool: '#eval-source-map'
};

// const pages = getHtmls();
// pages.forEach(function (pathname) {
//     // filename 用文件夹名字
//     let conf = {
//         filename: pathname.substring(6, pathname.length - 4) + '.html', //生成的html存放路径，相对于path
//         template: 'src/' + pathname + '.html', //html模板路径
//     };
//     let chunk = pathname.substring(6, pathname.length);
//     if (chunks.indexOf(chunk) > -1) {
//         conf.inject = 'body';
//         conf.chunks = ['vendors', chunk];
//     }
//     if (process.env.NODE_ENV === 'production') {
//         conf.hash = false;
//     }
//     //conf.favicon = './src/assets/img/logo.png';
//     config.plugins.push(new HtmlWebpackPlugin(conf));
// });

module.exports = config;

function getEntriesAndChunks() {
  let buildTarget = getBuildTarget();
  console.log("buildTarget in getEntriesAndChunks  is " + buildTarget);
  let _entry = buildTarget ? `./src/pages/${buildTarget}/app.*(js|ts)`
    : './src/pages/**/app.*(js|ts)';

  glob.sync(_entry).forEach(function (name) {
    let n = name.slice(name.lastIndexOf('src/') + 10, name.length - 3);
    entries[n] = [name];
    chunks.push(n);
  });
  console.log("getEntriesAndChunks->  " + chunks.join(" "));
}
function getBuildTarget() {
  if (!isPro) {//只有在build时候target才生效
    buildTarget = "";
    return ""
  }
  const path = resolve(__dirname, './build.json');
  if (!fs.existsSync(path)) return "";

  try {
    let buildConfig = JSON.parse(fs.readFileSync(path));
    buildTarget = buildConfig.target || "";
    console.log("配置buildTarget->:" + buildTarget);
    return buildTarget;
  } catch (e) {
    return "";
  }
}
function getHtmls() {
  let htmls = [];
  let buildTarget = getBuildTarget();
  if (buildTarget) {
    htmls.push(`pages/${buildTarget}/app`);
    return htmls;
  }

  glob.sync('./src/pages/**/*.html').forEach(function (name) {
    let n = name.slice(name.lastIndexOf('src/') + 4, name.length - 5);
    htmls.push(n);
  });
  console.log("getHtmls=> " + htmls.join(" "));
  return htmls;
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}
