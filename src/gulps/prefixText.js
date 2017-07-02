/**
 * Created by jsons on 2017/6/22.
 */
var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = 'gulp-prefixer';

// 插件级别的函数（处理文件）
function gulpPrefixer() {

  // 创建一个 stream 通道，以让每个文件通过
  let stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    let headPath = file.path.replace("user.js", "head.js");
    if (!fs.existsSync(headPath)) {
      this.emit('error', new PluginError(PLUGIN_NAME, file.path + ' has not match *.head.js!'));
      return cb();
    }
    let headBuffer = fs.readFileSync(headPath);

    if (file.isBuffer()) {
      file.contents = Buffer.concat([headBuffer, file.contents]);
    }

    // 确保文件进入下一个 gulp 插件
    this.push(file);

    // 告诉 stream 引擎，我们已经处理完了这个文件
    cb();
  });

  // 返回文件 stream
  return stream;
};

// 导出插件主函数
module.exports = gulpPrefixer;
