import {Vue, Component, axios, $, Cookies} from "../source/base"
import {getMousePosition, startLogAllInput, setAllInput} from "../source/dom"


@Component
export default class SideNavVC extends Vue {
  mouseX = 0;
  mouseY = 0;
  navLeft = 0;
  navTop = 200;

  funToPic() {
    console.log("进入看图模式   - by side nav");
    this.$emit("pic")
  }

  test1() {

  }

  goTop() {
    scroll(0, 0)
  }

  fillHistory() {
    setAllInput()
  }

  mounted() {
    let vm = this;
    let body = document.getElementsByTagName("body")[0];
    body.onmousemove = function (e) {
      let pointer = getMousePosition(e);
      vm.mouseX = pointer.x;
      vm.mouseY = pointer.y
    };

    $(function () {
      $(window).scroll(() => {
        let top = $("body").scrollTop() + 200;
        vm.navTop = top
      });
    });

    startLogAllInput()
  }
}
