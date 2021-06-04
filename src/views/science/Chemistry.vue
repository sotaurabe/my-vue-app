<template>
  <div>
    <p>ここは化学のページです</p>
    <div>
      <router-link to="/addBooks">参考書を追加する</router-link>
      <router-view />
    </div>
    <book-list japaName="化学" engName="che"></book-list>
  </div>
</template>
<script>
import bookList from "../../components/booklist.vue"

export default {
  components: { bookList },
}
</script>
