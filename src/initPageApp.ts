import {Vue, Component} from "./source/base"

import {appId, initVueDom} from "./source/InitAppDom"

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

