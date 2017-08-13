<template>
  <div class="DivSideNavTop" :style="{left:navLeft+'px',top:navTop + 'px'}">
    <div>
      <div>鼠标坐标</div>
      <span>x: {{mouseX}}  y:{{mouseY}}</span>
    </div>
    <div>
      <button @click="funToPic">进入看图</button>
    </div>

    <div>
      <button @click="fillHistory">填充数据</button>
    </div>
    <div>
      <button @click="goTop">回到顶部</button>
    </div>
  </div>
</template>

<script lang="ts" src="./sideNav.ts">
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
