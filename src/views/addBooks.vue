<template>
  <div class="add-books">
    <h1>参考書の追加</h1>
    <div class="add-books-box">
      <div class="select-subject">
        <p>科目の選択</p>
        <div class="subjectlist-box">
          <label
            ><input
              type="radio"
              value="phy"
              v-model="selectSubject"
            />物理</label
          >
          <label
            ><input
              type="radio"
              value="che"
              v-model="selectSubject"
            />化学</label
          >
          <label
            ><input
              type="radio"
              value="bio"
              v-model="selectSubject"
            />生物</label
          >
        </div>
      </div>
      <div class="input-box">
        <p>参考書名の登録</p>
        <input type="text" placeholder="参考書名" v-model="bookName" />
      </div>
      <div class="input-box">
        <p>出版社の登録</p>
        <input type="text" placeholder="出版社名" v-model="bookCompany" />
      </div>

      <button v-on:click="addBooks">追加</button>
    </div>
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
      if (
        this.bookName === "" ||
        this.bookCompany === "" ||
        this.selectSubject === ""
      ) {
        alert("全ての項目を入力してください")
      } else {
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
      }
    },
  },
}
</script>
<style scoped>
h1 {
  text-align: center;
}
p {
  font-weight: bold;
}
.add-books-box {
  background-color: rgba(65, 105, 225, 0.5);
  height: 400px;
  width: 60%;
  margin: 0 auto;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.subjectlist-box {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
}
.input-box {
  margin-bottom: 20px;
}
</style>
