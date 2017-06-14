<template>
  <div class="DivTop">
    <div>
      <span>{{flag}}</span>
      <button @click="test1">test1</button>
      <button @click="test2">test2</button>
    </div>
    <div class="DivImg" v-for="img in imgs">
      <img v-if="img" :src="img">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {injectFileOnCurrentTab, initPageHtmlStr, $, _, axios} from '../source/util';
  let testHtml = require("html-loader!../source/test.html");

  function getImgs() {
    let url = window.location.href;
    let pageCount = parseInt($("body > div.indexbox > div.r > div.nr_box > div.tg_pages > a:nth-child(1)").text()
      .replace("共", "").replace("页", ""));
    let urls = _.range(2, pageCount).map(a => url.replace(/.html/, `_${ a}.html`));
    return urls
  }

  export default {
    data(){
      return {
        name: 'vue@2.0',
        flag: new Date(),
        imgs: [],
        condition: {
          url: ""
        }
      }
    },
    methods: {
      test1(){
        console.log(this.imgs)
      },
      test2(){

      }
    },
    mounted(){
      let urls = getImgs();
      urls.forEach((url, i) => {
        axios.get(url).then(res => {
          let html = res.data;
          let imgUrl = $(html).find(".tcontent img").attr('src');
          console.log("get:  " + imgUrl);
          Vue.set(this.imgs, i, imgUrl);
        })
      });
    }
  }
</script>

<style scoped>
  .DivTop {
    padding: 30px 150px 10px 150px;
  }

  .DivImg {
    margin: 20px 20px 20px 20px;
  }
</style>
