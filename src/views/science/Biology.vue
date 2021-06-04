<template>
  <div>
    <p>ここは生物のページです</p>
    <div>
      <router-link to="/addBooks">参考書を追加する</router-link>
      <router-view />
    </div>
    <book-list japaName="生物" engName="bio"></book-list>
  </div>
</template>
<script>
import bookList from "../../components/booklist.vue"

export default {
  components: { bookList },
}
</script>
