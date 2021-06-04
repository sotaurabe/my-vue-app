<template>
  <div>
    <div class="header">
      <div class="header-title">サイエンスブックレビュー</div>
    </div>
    <router-link to="/physics">物理</router-link>|
    <router-link to="/chemistry">化学</router-link>|
    <router-link to="/biology">生物</router-link>

    <router-view />
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-image: url("https://www.cis-trans.jp/image/image23.jpg");
}
.header-title {
  font-size: 50px;
  text-align: center;
}
</style>
