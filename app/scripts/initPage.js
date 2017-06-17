/**
 * 将页面原有内容清除,然后注入vue初始模板页
 * */

import { $, _} from "../source/util"
import axios from 'axios';

import Vue from 'vue';
import App from '../views/app.vue';
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-default/index.css";
document.title = "ChromeView";
if ($("#myChromeView").length > 0) {
  $("#myChromeView").html("")
} else {
  $("body").append("<div id='myChromeView'></div>");
}

// Vue.use(ElementUI);
let app = new Vue({
  el: '#myChromeView',
  data: {
    name: 'vue-chrome-extension'
  },
  render: h => h(App)
});
