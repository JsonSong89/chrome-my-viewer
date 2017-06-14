/**
 * 将页面原有内容清除,然后注入vue初始模板页
 * */

import {initPageHtmlStr} from "../source/util"
let newDoc = document.open("text/html", "replace");
newDoc.write(initPageHtmlStr);
newDoc.close();
