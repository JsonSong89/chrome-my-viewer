<template>
  <div class="DivSideNavTop" :style="{left:navLeft+'px',top:navTop + 'px'}">
    <div>
      <div>鼠标坐标</div>
      <span>x: {{mouseX}}  y:{{mouseY}}</span>
    </div>
    <div>
      <button @click="fillHistory">填充数据</button>
    </div>
    <div>
      <button @click="goTop">回到顶部</button>
    </div>
  </div>
</template>

<script type="ts" lang="ts">
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


</script>

<style scoped>
  .DivSideNavTop {
    width: 150px;
    height: 300px;
    position: absolute;
    top: 200px;
    font-size: 12px;
  }

  .DivImg {
    margin: 20px 20px 20px 20px;
  }

  .DivTest111 {
    padding: 30px 150px 10px 150px;
  }
</style>
