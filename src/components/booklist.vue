<template>
  <div>
    <div class="subject-title">
      {{ japaName }}
      の参考書一覧
    </div>
    <div class="select-order">
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
    </div>

    <div class="booklist-box">
      <div v-for="book in Books" :key="book.id">
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
          class="book-button"
          ><div class="book-box">
            <div class="book-name">{{ book.Name }}</div>
            <div class="book-company">{{ book.Company }}</div>
            <div class="book-level">
              <div class="book-difficulty">
                難易度

                <div class="book-ave">
                  <img src="../assets/鉛筆の画像.png" class="pencil" />{{
                    book.DifficultyAve
                  }}
                </div>
              </div>
              <div class="book-favorite">
                おすすめ度

                <div class="book-ave">
                  <img src="../assets/星の画像.png" class="pencil" />{{
                    book.FavoriteAve
                  }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <router-view />
      </div>
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
  text-align: center;
  margin-bottom: 20px;
}
.select-order {
  display: flex;
  width: 60%;
  margin: 0 auto;
  justify-content: space-around;
}
.book-button {
  color: #2c3e50;
  text-decoration: none;
}

.booklist-box {
  background-color: rgba(65, 105, 225, 0.5);
  padding-top: 20px;
  padding-bottom: 30px;
}
.book-box {
  width: 60%;
  margin: 0 auto;
  background-color: white;
  margin-top: 10px;
  padding: 30px;
  transition: 0.1s;
}
.book-box:hover {
  outline: 4px solid rgba(65, 105, 225, 0.5);
}
.book-name {
  font-size: 25px;
  font-weight: bold;
}
.book-level {
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.book-ave {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
.pencil {
  height: 20px;
  margin-right: 10px;
}
</style>
