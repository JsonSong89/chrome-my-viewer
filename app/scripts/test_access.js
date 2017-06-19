/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在background环境]
 * */

import $ from "jquery"
import _ from "lodash"
import moment from "moment"
import axios from "axios"
import Cookies from "js-cookie"
document.title = "ChromeView";

import {injectScriptInDom, injectFileOnCurrentTab} from "../source/util"


const libs = {$, _, moment, Cookies, axios, jq: $};

Object.keys(libs).forEach(k => {
  if (!window[k]) {
    window[k] = libs[k]
  }
});

