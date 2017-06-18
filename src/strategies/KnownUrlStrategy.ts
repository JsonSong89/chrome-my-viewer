/**
 * Created by jsons on 2017/6/17.
 * 可以通过构造url来进行组装页面的策略集合
 */
import {axios, Vue, _, $} from "source/base";

interface UrlItem {
  reg: RegExp
  getTotalPage($$: JQuery): number
  getImgUrl($$: JQuery): string
}
function getNumFromStr(str: string): number {
  let result = str.match(/[0-9]+/g);
  if (!result || result.length === 0) throw new Error("获取总页数出错");
  return parseInt(result[0])
}

const urlItems: UrlItem[] = [
  {
    reg: /www.yaoqmhw.com/,
    getImgUrl($$: JQuery){
      return $$.find(" div.content div.ny a > img").attr("src")
    },
    getTotalPage($$: JQuery){
      let str = $$.find(".inc_page > a:nth-child(1)").text();
      return getNumFromStr(str)
    }
  },
  {
    reg: /www.gkba.cc/,
    getImgUrl($$: JQuery){
      return $$.find(" div.tcontent   img").attr("src")
    },
    getTotalPage($$: JQuery){
      let str = $$.find(".tg_pages >  a:nth-child(1)").text();
      return getNumFromStr(str)
    }
  },
  {
    reg: /www.selie.org/,
    getImgUrl($$: JQuery){
      return $$.find("#imgshow img").attr("src")
    },
    getTotalPage($$: JQuery){
      let str = $$.find(".pagelist:eq(0) > li:nth-child(1) > a:nth-child(1)").text();
      return getNumFromStr(str)
    }
  }];


class KnownUrlStrategy {
  item: UrlItem;

  constructor(item: UrlItem, url: string, totalPage: number) {
    this.item = item;
    this.urls = _.range(2, totalPage).map(a => url.replace(/.html/, `_${ a}.html`));
  }

  urls: string[];

  getImgUrl($$: JQuery): string {
    return this.item.getImgUrl($$)
  }
}

class KnownUrlStrategyFactory {
  static getStrategy(url: string, $$: JQuery): KnownUrlStrategy | null {
    let find = urlItems.find(a => a.reg.test(url));
    if (find == null) {
      console.warn("没有找到对应的KnownUrl策略");
      return null;
    }
    let totalPage = find.getTotalPage($$);
    return new KnownUrlStrategy(find, url, totalPage)
  }

  static doGetImgs(imgs: string[], strategy: KnownUrlStrategy | null) {
    if (strategy == null)return;
    imgs.length = 0;
    strategy.urls.forEach((url, i) => {
      axios.get(url).then(res => {
        let html = res.data;
        let imgUrl = strategy.getImgUrl($(html));
        console.log("get:  " + imgUrl);
        Vue.set(imgs, i, imgUrl);
      })
    });
  }
}

export {KnownUrlStrategyFactory, KnownUrlStrategy}

