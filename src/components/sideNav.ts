import {Vue, Component, axios, $, Cookies} from "../source/base"

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
let logAllInput = () => {
  $(() => {
    $("input").on("change", () => {
      let arr = $("input").map((i, input) => $(input).val());
      console.log(arr);
      localStorage.setItem(ck, JSON.stringify(arr))
    })
  })
};
let getAllInput = () => {
  let arr = JSON.parse(localStorage.getItem(ck) || "[]");
  $("input").each((i, e) => {
    $(e).val(arr[i])
  })
};

@Component
export default class SideNavVC extends Vue {
  mouseX = 0;
  mouseY = 0;
  navLeft = 0;
  navTop = 200;

  test1() {

  }

  goTop() {
    scroll(0, 0)
  }

  fillHistory() {
    getAllInput()
  }

  mounted() {
    let vm = this;
    let body = document.getElementsByTagName("body")[0];
    body.onmousemove = function (e) {
      let pointer = getMousePosition(e);
      vm.test1();
      vm.mouseX = pointer.x;
      vm.mouseY = pointer.y
    };

    $(function () {
      $(window).scroll(() => {
        console.log("DivSectionViewTop")
        let top = $("body").scrollTop() + 200;
        //$("#divTodayOrderCountTop").css({"padding-top": top + "px"});
        vm.navTop = top
      });
    });

    logAllInput()

//document.elementFromPoint(2, 2);
  }
}
