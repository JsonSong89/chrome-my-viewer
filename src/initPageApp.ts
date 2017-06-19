import {Vue, Component} from "./source/base"

import {appId, initVueDom} from "./source/InitAppDom"

import globalComponents from "./config/globalComponents"
//注册全局组件
Object.keys(globalComponents).forEach(k => Vue.component(k, globalComponents[k]));

initVueDom();

import gkmhApp from "./views/gkmh.vue"


console.log("开始注入vue组件");
let app = new Vue({
  el: "#" + appId,
  data: {
    name: 'vue-chrome-extension'
  },
  render: h => h(gkmhApp)
});

