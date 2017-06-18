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
    methods: {
      test1(){
        injectFileOnCurrentTab("scripts/vendors.js");
        setTimeout(() => injectFileOnCurrentTab('/scripts/initPageApp.js'), 100)
      },
      test2(){
        injectFileOnCurrentTab('/scripts/initPage.js')
      },
      test3(){
      },
    },
    components: {
      hello: Hello
    }
  }
</script>

<style lang="css">
</style>
