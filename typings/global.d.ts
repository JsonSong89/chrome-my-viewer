import * as moment from "moment";
import * as Vue from "vue";
import _ from 'lodash'
import * as jQuery from "jquery";


declare global {
  interface Window {
    moment: typeof moment
    $: typeof jQuery
    Vue: typeof Vue
    _: typeof _
    chrome: any
  }
}

declare interface Vue {
  http: any
}
