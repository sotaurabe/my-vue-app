<template>
  <div>
    <h1>物理</h1>
    <div class="add-books-button">
      <router-link to="/addBooks">参考書を追加する</router-link>
      <router-view />
    </div>
    <div class="book-list">
      <book-list japaName="物理" engName="phy"></book-list>
    </div>
  </div>
</template>
<script>
import bookList from "../../components/booklist.vue"

export default {
  components: { bookList },
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.book-list {
  text-align: center;
}
.add-books-button {
  float: right;
}
</style>
