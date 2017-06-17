/**
 * Created by Administrator on 2017/6/14.
 */
let initPageHtmlStr = require("html-loader!./initApp.html");
import $ from "./lib/jquery"
import _ from "./lib/lodash"
import axios from "axios"

function injectFile(id, str) {
  if (str.substr(-2, 2).toLowerCase() === "js") {
    chrome.tabs.executeScript(id, {
      file: str,
      allFrames: false
    });
    return;
  }
  if (str.substr(-3, 3).toLowerCase() === "css") {
    chrome.tabs.insertCSS(id, {
      file: str,
      allFrames: false
    });
    return;
  }
  return;
}


let injectFileOnCurrentTab = function (path) {
  if (!chrome) return;
  chrome.windows.getCurrent(function (currentWindow) {
    //获取有指定属性的标签，为空获取全部标签
    chrome.tabs.query({
      active: true, windowId: currentWindow.id
    }, function (activeTabs) {
      console.log("TabId:" + activeTabs[0].id);
      //执行注入，第一个参数表示向哪个标签注入
      //第二个参数是一个option对象，file表示要注入的文件，也可以是code
      //是code时，对应的值为要执行的js脚本内容，如：code: "alert(1);"
      //allFrames表示如果页面中有iframe，是否也向iframe中注入脚本
      injectFile(activeTabs[0].id, path);
    });
  });
};

let injectCodeOnCurrentTab = function (code) {
  if (!chrome) return;
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({
      active: true, windowId: currentWindow.id
    }, function (activeTabs) {
      chrome.tabs.insertCSS(activeTabs[0].id, {
        code,
        allFrames: false
      });
    });
  });
};

export {injectFileOnCurrentTab, injectCodeOnCurrentTab, initPageHtmlStr, $, _, axios}


