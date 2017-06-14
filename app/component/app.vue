<template lang="html">
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="notification is-info">
          <h1>内嵌组件4</h1>
          <hello></hello>
        </div>
      </div>
      <div class="column">
        <p class="notification is-success">
          <label class="label">Username</label>
        <p class="control has-icon has-icon-right">
          <input class="input is-success" type="text" v-model="name">
          <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
          <span class="help is-success">This username is available</span>
        </p>
        </p>
      </div>
      <div class="column">
        <p class="notification is-warning">Third column</p>
        <button @click="test1">进入浏览模式</button>
        <button @click="test2">test2</button>
      </div>
    </div>
  </div>
</template>

<script>


  import Hello from './hello.vue';
  import {injectFileOnCurrentTab, initPAgeHtmlStr} from '../source/util';
  export default {
    data(){
      return {
        name: 'vue@2.0'
      }
    },
    methods: {
      test1(){
        injectFileOnCurrentTab("scripts/initPage.js");
        setTimeout(() => {
          injectFileOnCurrentTab("scripts/popup.js");
          injectFileOnCurrentTab("styles/popup.css");
        }, 100)
      },
      test2(){
        console.log(initPAgeHtmlStr)
      }
    },
    components: {
      hello: Hello
    }
  }
</script>

<style lang="css">
</style>
