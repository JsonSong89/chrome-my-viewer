/**
 * Created by jsons on 2017/6/17.
 * 可以通过构造url来进行组装页面的策略集合
 */
import {axios, Vue, _, $} from "source/base";

/**
 *  selected by get next url
 */
interface NextStrategy {
  /**
   * get next page url
   */
  getNextUrl($$: JQuery): string

  /**
   *  get img url
   */
  getImgUrl($$: JQuery): string
}


let strategyList = [{
  reg: /www.selie.org|www.xieeqiao.com/,

  getNextUrl($$: JQuery): string {
    let a = $$.find("div.pageturn > a:last");
    if (a.text() != "下一页") return "";
    return a.attr("href")
  },

  getImgUrl($$: JQuery): string {
    return $$.find("div.content-dutu img").attr("src")
  }
}];

function getRandomToken(): string {
  return _.random(10000, 99999).toString()
}

class NextStrategyFactory {
  static getStrategy(url: string): NextStrategy | null {
    let find = strategyList.find(a => a.reg.test(url));
    if (find == null) {
      console.info("没有找到对应的Next策略")
    } else {
      console.log("加载Next策略")
    }
    return find as NextStrategy;
  }

  static doGetImgs(imgs: string[], $$: JQuery, strategy: NextStrategy | null) {
    if (strategy == null) {
      console.log("跳过NextStrategy策略");
      return;
    }
    let nextUrl = strategy.getNextUrl($$);
    if (nextUrl) {
      nextUrl = nextUrl.indexOf("?") >= 0 ? `${nextUrl}&_myRandomToken=${getRandomToken()}` : `${nextUrl}?_myRandomToken=${getRandomToken()}`;
      axios.get(nextUrl).then(res => {
        console.log("get:  " + nextUrl);
        let _$ = $(res.data);
        imgs.push(strategy.getImgUrl(_$));
        let _next = strategy.getNextUrl(_$);
        if (_next) {
          return NextStrategyFactory.doGetImgs(imgs, _$, strategy)
        } else {
          return
        }
      }).catch(err => {
        console.log(nextUrl + " error : " + err)
      })
    }
  }
}

export {NextStrategyFactory, NextStrategy}

