<template>
  <div class="DivTop">
    <div>
      <span>{{flag}}</span>
      <button @click="test1">test1</button>
      <button @click="test2">test2</button>
    </div>
    <div class="DivImg" v-for="img in imgs">
      <img v-if="img" :src="img">
    </div>
  </div>
</template>

<script type="ts" lang="ts" src="./app.ts">
</script>

<style scoped>
  .DivTop {
    padding: 30px 150px 10px 150px;
  }

  .DivImg {
    margin: 20px 20px 20px 20px;
  }
</style>
