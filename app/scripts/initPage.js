/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在background环境]
 * */

import {injectScriptInDom, injectFileOnCurrentTab} from "../source/util"

injectScriptInDom("scripts/test_access.js");
