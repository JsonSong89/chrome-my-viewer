/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在background环境]
 * */

import $ from "jquery"
document.title = "ChromeView";

import {injectScriptInDom, injectFileOnCurrentTab} from "../source/util"


// if (!window.$ || !window._ || !window.axios) {
//   injectScriptInDom(chrome.extension.getURL('/scripts/test_access.js'));
// }

if ($("#myChromeView").length > 0) {
  $("#myChromeView").html("<div id='myChromeViewApp'></div>")
} else {
  $("body").append("<div id='myChromeView'> <div id='myChromeViewApp'></div> </div>");
}

setTimeout(() => {
  //由另外的webpack打包

  // injectFileOnCurrentTab('/scripts/initPageApp.js');
  // injectScriptInDom(chrome.extension.getURL('/scripts/initPageApp.js'));
}, 50);
// Vue.use(ElementUI);


