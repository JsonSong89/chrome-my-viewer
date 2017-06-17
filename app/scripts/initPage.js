/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在background环境]
 * */

import {initPageHtmlStr, $, _} from "../source/util"
import axios from 'axios';

import Vue from 'vue';
import App from '../views/gkmh.vue';
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-default/index.css";

document.title = "ChromeView";


function injectScript(file, position = "head") {
  let th = document.getElementsByTagName(position)[0];
  let s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}

if (!window.$ || !window._ || !window.axios) {
  injectScript(chrome.extension.getURL('/scripts/test_access.js'));
}

if ($("#myChromeView").length > 0) {
  $("#myChromeView").html("<div id='myChromeViewApp'></div>")
} else {
  $("body").append("<div id='myChromeView'> <div id='myChromeViewApp'></div> </div>");
}

// Vue.use(ElementUI);



let app = new Vue({
  el: '#myChromeViewApp',
  data: {
    name: 'vue-chrome-extension'
  },
  render: h => h(App)
});
