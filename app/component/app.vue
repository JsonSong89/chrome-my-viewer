<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column">
        <p class="notification ">功能面板</p>
        <button @click="test1">进入浏览模式(background)</button>
        <button @click="test3">进入浏览模式(dom)</button>
        <button @click="test2">注入常用库</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Hello from './hello.vue';
  import {injectFileOnCurrentTab, injectScriptInDom} from '../source/util';
  export default {
    data(){
      return {
        name: 'vue@2.0'
      }
    },
    mounted(){

    },
    methods: {
      test1(){
        injectFileOnCurrentTab("scripts/vendors.js");
        setTimeout(() => injectFileOnCurrentTab('/scripts/initPageApp.js'), 100)
      },
      test2(){
        injectFileOnCurrentTab('/scripts/initPage.js')
      },
      test3(){

        chrome.tabs.query(
          {active: true, currentWindow: true},
          function (tabs) {
            var port = chrome.tabs.connect(//建立通道
              tabs[0].id,
              {name: "ma"}//通道名称
            );
            $("#popup").click(function () {//给web页面的按钮绑定点击事件，通过点击事件来控制发送消息
              port.postMessage({jia: "aaaaaaa"});//向通道中发送消息
            });
            port.onMessage.addListener(function (msg) {//这里同时利用通道建立监听消息，可以监听对方返回的消息
              if (msg.jia == "yuuuuu") {//如果对方(popup.js)返回的消息是{jia: "yuuuuu"}则将扩展里面的input框的值设置为"yuuuuuuu"
                $('#input').val("yuuuuuuu");
              }
              ;
            });
          });

      },
    },
    components: {
      hello: Hello
    }
  }
</script>

<style lang="css">
</style>
