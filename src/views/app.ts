import KnownUrlStrategy  from '../strategies/KnownUrlStrategy';

function getImgs() {

}

import {Vue, Component, axios, $} from "../source/base"

@Component
export default class KnowUrlVC extends Vue {

  str = "zhanweitest";
  flag = new Date();

  imgs: string[] = [];

  test1() {
    console.log(this.str)
  }

  test2() {
  }

  mounted() {
    let url = window.location.href;
    let strategy = new KnownUrlStrategy(url, $("body"));
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
