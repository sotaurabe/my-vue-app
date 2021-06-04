<template>
  <div>
    <div>
      {{ japaName }}
      の参考書一覧
    </div>
    <div v-for="book in reverseBooks" :key="book.id">
      {{ book.Name }}
      {{ book.Company }}
      難易度
      {{ book.DifficultyAve }}
      おすすめ度
      {{ book.FavoriteAve }}
      <router-link
        :to="{
          name: 'ReviewList',
          params: {
            bookName: book.Name,
            bookCompany: book.Company,
            bookId: book.id,
            bookSubject: book.Subject,
          },
        }"
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
  computed: {
    reverseBooks() {
      return this.Books.slice().reverse()
    },
  },
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
