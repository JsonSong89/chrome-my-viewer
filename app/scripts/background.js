// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: ''});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
   // return {redirectUrl: chrome.extension.getURL("scripts/test_access.js")}; //returns.js是你要替换的js脚本
    return {redirectUrl: chrome.extension.getURL("scripts/test_access.js")}; //returns.js是你要替换的js脚本
  },
  {
    //http://127.0.0.1:4051/ums/test2.html
    urls: ["*://127.0.0.1/*/test2.html"],  //你要拦截的url地址
    types: ["html"]       //拦截类型为script，
  },
  ["blocking"] //类型blocking为拦截,
);
