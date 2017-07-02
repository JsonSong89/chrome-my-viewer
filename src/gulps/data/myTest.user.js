/**
 * Created by jsons on 2017/6/22.
 */



String.prototype.format = function () {
  var args = arguments;
  var reg = /\{(\d+)}/g;
  return this.replace(reg, function (g0, g1) {
    return args[+g1];
  });
};

let url = document.location.href;


//document.getElementById("down_btn").removeAttribute("onclick");
if (url.indexOf("happytogether2015") >= 0) {
  $("#down_btn").removeAttr("onclick");
}

if (url.indexOf("dygod") >= 0) {
  console.log("recognize dygod ");
  let a = $("a[title='迅雷专用高速下载']");
  let table = a.closest("table");
  let htmlStr = "<a about=''  > "

  table.append("<tr>  <td> <input style='width: 100%'  type='text' value='{0}' />   </td></tr>".format(a.html()))
}

if (url.indexOf("quanji") >= 0 || url.indexOf("loldytt") >= 0) {
  $(".downurl").each(function () {
    let ul = $(this);
    let urls = [];
    ul.find(".dwon_xl a").each(function () {
      urls.push($(this).attr("href"))
    });
    urls.push($(this).attr("href"));
    let result = urls.join("\n");
    ul.siblings(".ckall").append("<textarea type='button' name='btnShowResult'  > </textarea>")
    ul.siblings(".ckall").find("textarea[name=btnShowResult]").html(result)
    console.log(result)
  });
}

if (url.indexOf("avlang") >= 0) {

  $(".index-info .tac a").remove();
  $(".index-info .tac").css("height", 10);
  let question = $("select[name=question]")
  if (question.is() || true){
    question.val(3)
    question.closest("tbody").find("input[name=answer]").val("123123")
  }
}

if (url.indexOf("dms.console.aliyun.com") >= 0) {
  setTimeout(()=>{
    document.getElementById("connectStr-itemInputBox").value = document.getElementById("connectStr-itemInputBox").value .replace("shumixian-bms-","")
    console.log(' document.getElementById("connectStr-itemInputBox").value = document.getElementById("connectStr-itemInputBox").value .replace("shumixian-bms-","")')
  },4000)
}


//http://www.gongkou.net/gongkou/4773.html 下一页绑定右键
if (url.indexOf("gongkou.net") >= 0 ) {
  $(document).keyup(function (e) {
    console.log("keyCode"+e.keyCode);
    if (e.keyCode === 39) {
      $("div.tg_pages").find("a:last")[0].click()
    }
  });
  $("#scrolltop").click(function(){
    $("div.tg_pages").find("a:last")[0].click()
  })
}
