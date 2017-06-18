/**
 * 将页面原有内容清除,然后注入vue初始模板页[注意:此js运行在background环境]
 * */

import $ from "jquery"


function injectScriptInDom(file, position = "head") {
  let th = document.getElementsByTagName(position)[0];
  let s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
const appId = "myChromeViewApp";

function initVueDom() {
  document.title = "ChromeView";
  if ($("#myChromeView").length > 0) {
    $("#myChromeView").html("<div id='myChromeViewApp'></div>")
  } else {
    $("body").append("<div id='myChromeView'> <div id='myChromeViewApp'></div> </div>");
  }
}


export {initVueDom, appId}

