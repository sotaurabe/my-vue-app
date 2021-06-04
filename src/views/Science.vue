<template>
  <div>
    <p>理科のページ</p>
    <router-link to="/physics">物理</router-link>|
    <router-link to="/chemistry">化学</router-link>|
    <router-link to="/biology">生物</router-link>

    <router-view />
  </div>
</template>
