import {injectFileOnCurrentTab, $, _, axios} from '../source/util.js';

import KnownUrlStrategy  from '../source/strategies/KnownUrlStrategy';

function getImgs() {

}

import {Vue, Component} from "../source/base"

@Component
export default class KnowUrlVC extends Vue {

  flag = new Date();

  imgs: string[] = [];

  test1() {
  }

  test2() {
  }

  mounted() {
    let url = window.location.href;
    let strategy = new KnownUrlStrategy(url);
    let strategyItem = strategy.urlItem;
    let urls = strategy.getUrls();

    urls.forEach((url, i) => {
      axios.get(url).then(res => {
        let html = res.data;
        let imgUrl = strategyItem.getImgUrl($(html));
        console.log("get:  " + imgUrl);
        Vue.set(this.imgs, i, imgUrl);
      })
    });
  }
}
