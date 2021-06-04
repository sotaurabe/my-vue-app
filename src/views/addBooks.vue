<template>
  <div>
    <p>参考書の追加</p>
    <div id="selectSubject">
      <label
        ><input type="radio" value="phy" v-model="selectSubject" />物理</label
      >
      <label
        ><input type="radio" value="che" v-model="selectSubject" />化学</label
      >
      <label
        ><input type="radio" value="bio" v-model="selectSubject" />生物</label
      >
    </div>
    <input type="text" placeholder="参考書名" v-model="bookName" />
    <input type="text" placeholder="出版社名" v-model="bookCompany" />
    <button v-on:click="addBooks">追加</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      selectSubject: "",
      bookName: "",
      bookCompany: "",
      phyBooks: [],
      cheBooks: [],
      bioBooks: [],
    }
  },
  methods: {
    addBooks() {
      const book = {
        Name: this.bookName,
        Company: this.bookCompany,
        Subject: this.selectSubject,
        DifficultyAve: "",
        FavoriteAve: "",
      }

      if (this.selectSubject === "phy") {
        firebase
          .firestore()
          .collection("phyBooks")
          .add(book)
          .then(() => {
            this.phyBooks.push(book)
          })
        this.bookName = ""
        this.bookCompany = ""
      } else if (this.selectSubject === "che") {
        firebase
          .firestore()
          .collection("cheBooks")
          .add(book)
          .then(() => {
            this.cheBooks.push(book)
          })
        this.bookName = ""
        this.bookCompany = ""
      } else {
        firebase
          .firestore()
          .collection("bioBooks")
          .add(book)
          .then(() => {
            this.phyBooks.push(book)
          })
        this.bookName = ""
        this.bookCompany = ""
      }
    },
  },
}
</script>
