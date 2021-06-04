<template>
  <div>
    <p>ここは物理のページです</p>
    <div>
      <router-link to="/addBooks">参考書を追加する</router-link>
      <router-view />
    </div>
    <book-list japaName="物理" engName="phy"></book-list>
  </div>
</template>
<script>
import bookList from "../../components/booklist.vue"

export default {
  components: { bookList },
}
</script>
