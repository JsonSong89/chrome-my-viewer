/**
 * Created by Administrator on 2017/4/11.
 */

import {$} from "../source/base"

let getMousePosition = function (e) {
  e = e || window.event;
  let x = e.pageX || (e.clientX +
    (document.documentElement.scrollLeft
      || document.body.scrollLeft));
  let y = e.pageY || (e.clientY +
    (document.documentElement.scrollTop
      || document.body.scrollTop));
  return {'x': x, 'y': y};
};

const ck = "InputKey";
let startLogAllInput = () => {
  $(() => {
    $("input").on("change", () => {
      let arr = $("input").map((i, input) => $(input).val());
      console.log(arr);
      localStorage.setItem(ck, JSON.stringify(arr))
    })
  })
};
let setAllInput = () => {
  let arr = JSON.parse(localStorage.getItem(ck) || "[]");
  $("input").each((i, e) => {
    $(e).val(arr[i])
  })
};

export {
  getMousePosition, startLogAllInput, setAllInput
}

