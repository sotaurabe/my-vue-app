<template>
  <div>
    <div class="subject-title">
      {{ japaName }}
      の参考書一覧
    </div>
    <label
      ><input
        type="radio"
        name="selectOrder"
        v-on:input="OrderByDifficultyUp"
      />難易度昇順</label
    >
    <label
      ><input
        type="radio"
        name="selectOrder"
        v-on:input="OrderByDifficultyDown"
      />難易度降順</label
    >
    <label
      ><input
        type="radio"
        name="selectOrder"
        v-on:input="OrderByFavarite"
      />おすすめ度順</label
    >

    <div v-for="book in Books" :key="book.id">
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

  methods: {
    OrderByDifficultyUp() {
      this.Books = []
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
    OrderByDifficultyDown() {
      this.Books = []
      firebase
        .firestore()
        .collection(this.bookCollection)
        .orderBy("DifficultyAve", "desc")
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
    OrderByFavarite() {
      this.Books = []
      firebase
        .firestore()
        .collection(this.bookCollection)
        .orderBy("FavoriteAve", "desc")
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

<style scoped>
.subject-title {
  font-size: 30px;
}
</style>
