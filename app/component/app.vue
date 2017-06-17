<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column">
        <p class="notification ">功能面板</p>
        <button @click="test1">进入浏览模式</button>
        <button @click="test2">注入常用库</button>
      </div>
    </div>
  </div>
</template>

<script>


  import Hello from './hello.vue';
  import {injectFileOnCurrentTab, injectCodeOnCurrentTab, initPageHtmlStr} from '../source/util';
  export default {
    data(){
      return {
        name: 'vue@2.0'
      }
    },
    methods: {
      test1(){
        injectFileOnCurrentTab("scripts/initPage.js");
//        setTimeout(() => {
//          injectFileOnCurrentTab("scripts/popup.js");
//          injectFileOnCurrentTab("styles/popup.css");
//        }, 100)
      },
      test2(){
        let path = chrome.extension.getURL('/scripts/test_access.js');
        let injectFun = function (path) {
          let s = document.createElement('script');
          s.setAttribute('type', 'text/javascript');
          s.setAttribute('src', path);
          document.getElementsByTagName("head")[0].appendChild(s)
        };
        injectCodeOnCurrentTab(injectFun.toString() + ` ;\n injectFun('${path}')`);
        console.log(injectFun.toString())
      }
    },
    components: {
      hello: Hello
    }
  }
</script>

<style lang="css">
</style>
