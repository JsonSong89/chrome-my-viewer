import Vue from 'vue';
import App from '../component/app.vue';

var app=new Vue({
  el:'#app',
  data:{
    name:'vue-chrome-extension'
  },
  render: h =>h(App)
});
// import {injectFileOnCurrentTab} from '../source/util';
//
// window.test1 = function () {
//   injectFileOnCurrentTab("scripts/initPage.js");
// };
