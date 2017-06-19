/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在content环境]
 * */

import {injectScriptInDom, injectFileOnCurrentTab} from "../source/util"

injectScriptInDom("scripts/test_access.js");


//  "content_scripts2": [{
//    "matches": ["http://*/*","https://*/*"],
//    "js": ["scripts/vendors.js","scripts/initPageApp.js"],
//    "run_at": "document_end",
//    "all_frames": false
//  }],
