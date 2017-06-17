/**
 * Created by jsons on 2017/6/17.
 * 可以通过构造url来进行组装页面的策略集合
 */
import  $ from "jquery";
import  _ from "lodash";
///<reference path="jquery.d.ts" />
let what = $("#sdf");

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

const urlItems: UrlItem[] = [{
  reg: /www.xieeqiao.com|www.yaoqmhw.com/,
  getImgUrl($$: JQuery){
    return $$.find(" div.content div.ny a > img").attr("src")
  },
  getTotalPage($$: JQuery){
    let str = $$.find(".inc_page > a:nth-child(1)").text();
    return getNumFromStr(str)
  }
}, {
  reg: /www.gkba.cc/,
  getImgUrl($$: JQuery){
    return $$.find(" div.tcontent   img").attr("src")
  },
  getTotalPage($$: JQuery){
    let str = $$.find(".tg_pages >  a:nth-child(1)").text();
    return getNumFromStr(str)
  }
}, {
  reg: /www.selie.org/,
  getImgUrl($$: JQuery){
    return $$.find("#imgshow img").attr("src")
  },
  getTotalPage($$: JQuery){
    let str = $$.find(".pagelist:eq(0) > li:nth-child(1) > a:nth-child(1)").text();
    return getNumFromStr(str)
  }
}];


export default class KnownUrlStrategy extends BaseStrategy {

  private totalPage: number;
  private url: string;
  urlItem: UrlItem;

  constructor(url: string) {
    super();
    this.url = url;
    let find = urlItems.find(a => a.reg.test(url));
    if (find == null) throw new Error("没有找到正确的处理策略");
    this.urlItem = find;
  }

  getUrls() {
    return _.range(2, this.totalPage).map(a => this.url.replace(/.html/, `_${ a}.html`));
  }

  useThis(url: string, html?: string): boolean {
    return [/www.xieeqiao.com/, /www.yaoqmhw.com/, /www.gkba.cc/].some(a => a.test(url));
  }

  hasNext(url: string, html?: string): boolean {
    return this.pageIndex < this.totalPage
  }

  isFinish(url: string, html?: string): boolean {
    return this.pageIndex == this.totalPage
  }
}

