import {Vue, Component, axios, $} from "../source/base"
import {KnownUrlStrategyFactory, KnownUrlStrategy} from '../strategies/KnownUrlStrategy';
import {NextStrategyFactory, NextStrategy} from '../strategies/NextStrategy';

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

  private useStrategy(url: string) {
    KnownUrlStrategyFactory.doGetImgs(this.imgs, KnownUrlStrategyFactory.getStrategy(url, $("body")));
    NextStrategyFactory.doGetImgs(this.imgs, $("body"), NextStrategyFactory.getStrategy(url));
  }

  mounted() {
    let url = window.location.href;
    this.useStrategy(url)
  }
}
