<template>
  <div>
    <h1>物理</h1>
    <div class="add-books">
      <router-link to="/addBooks" class="add-books-button"
        >参考書を追加する</router-link
      >
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
.add-books {
  text-align: right;
  margin-bottom: 20px;
}
.add-books-button {
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  position: relative;
  z-index: 1;
  background-color: transparent;
  border: 3px solid rgba(65, 105, 225, 0.5);
  color: rgba(65, 105, 225, 0.5);
  transition: 0.5s;
}
.add-books-button:hover {
  color: #fff;
}
.add-books-button::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: #2eccfa;
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform ease 0.5s;
}
.add-books-button:hover::before {
  transform-origin: 50% 100%;
  transform: scaleY(1);
}
</style>
