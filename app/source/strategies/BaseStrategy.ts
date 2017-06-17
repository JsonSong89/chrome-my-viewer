/**
 * Created by jsons on 2017/6/17.
 */

abstract class BaseStrategy {

  pageIndex: number = 0;

  abstract useThis(url: string, html?: string): boolean

  abstract hasNext(url: string, html?: string): boolean

  abstract isFinish(url: string, html?: string): boolean

}
