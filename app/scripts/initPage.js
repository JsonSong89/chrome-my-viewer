/**
 * 将页面原有内容清除,然后注入vue初始模板页
 * */




let html = "<html><head><meta charset='utf-8' />" +
  "<title>PopupTest</title>" +
  //  "<link rel='stylesheet' type='text/css' href='http://qn.jsonsong.com/bms/bms2/v1.1.3.5/css/main.css'>" +
  "</head><body><div id='app'></div></body></html> ";

var newDoc = document.open("text/html", "replace");
newDoc.write(`"${html}"`);
newDoc.close();
