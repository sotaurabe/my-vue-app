<template>
  <div>
    <div>
      {{ japaName }}
      の参考書一覧
    </div>
    <div v-for="book in Books" :key="book.id">
      {{ book.Name }}
      {{ book.Company }}
      <router-link :to="{ name: 'ReviewList', params: { bookName: book.Name } }"
        >レビューを見る</router-link
      >
      <router-view />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  props: {
    japaName: {
      type: String,
    },
    engName: {
      type: String,
    },
  },
  data() {
    return {
      Books: [],
      bookCollection: this.engName + "Books",
    }
  },

  methods: {},

  created() {
    firebase
      .firestore()
      .collection(this.bookCollection)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.Books.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>
