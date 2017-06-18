import {Vue, Component} from "./source/base"

import gkmhApp from "./views/gkmh.vue"

let app = new Vue({
  el: '#myChromeViewApp',
  data: {
    name: 'vue-chrome-extension'
  },
  render: h => h(gkmhApp)
});
