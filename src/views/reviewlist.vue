<template>
  <div>
    <router-view></router-view>
    <div>{{ bookName }}</div>
    <div>{{ bookCompany }}</div>
    <div>難易度:☆{{ difficultyAve }}</div>
    <div>おすすめ度:☆{{ favoriteAve }}</div>
    <div class="review-form">
      <h2>レビューを書く</h2>
      <div class="input-difficulty">
        <p>難易度</p>
        <label
          ><input type="radio" value="1" v-model="selectDifficulty" />1</label
        >
        <label
          ><input type="radio" value="2" v-model="selectDifficulty" />2</label
        >
        <label
          ><input type="radio" value="3" v-model="selectDifficulty" />3</label
        >
        <label
          ><input type="radio" value="4" v-model="selectDifficulty" />4</label
        >
        <label
          ><input type="radio" value="5" v-model="selectDifficulty" />5</label
        >
      </div>
      <div class="input-favorite">
        <p>おすすめ度</p>
        <label
          ><input type="radio" value="1" v-model="selectFavorite" />1</label
        >
        <label
          ><input type="radio" value="2" v-model="selectFavorite" />2</label
        >
        <label
          ><input type="radio" value="3" v-model="selectFavorite" />3</label
        >
        <label
          ><input type="radio" value="4" v-model="selectFavorite" />4</label
        >
        <label
          ><input type="radio" value="5" v-model="selectFavorite" />5</label
        >
      </div>
      <div class="input-text">
        <p>あなたのレビュー</p>
        <textarea
          class="input-textarea"
          v-model="inputText"
          placeholder="とても分かりやすいです"
          maxlength="140"
        ></textarea>
      </div>
      <button class="input-button" v-on:click="postReview">投稿</button>
    </div>
    <div>
      <h2>レビューを見る</h2>
      <div v-for="review in reviews" :key="review.id">
        <div class="review-box">
          <p>難易度</p>
          {{ review.difficulty }}
          <p>おすすめ度</p>
          {{ review.favorite }}
          <p>レビュー</p>
          {{ review.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      selectDifficulty: "",
      selectFavorite: "",
      inputText: "",
      bookName: this.$route.params.bookName,
      bookCompany: this.$route.params.bookCompany,
      bookId: String(this.$route.params.bookId),
      bookSubject: this.$route.params.bookSubject,
      reviews: [],
      reviewCollection: this.$route.params.bookName + "reviews",
      difficultyArray: [],
      favoriteArray: [],
      difficultyAve: 0,
      favoriteAve: 0,
    }
  },
  methods: {
    postReview() {
      const review = {
        difficulty: this.selectDifficulty,
        favorite: this.selectFavorite,
        text: this.inputText,
      }

      firebase
        .firestore()
        .collection(this.reviewCollection)
        .add(review)
        .then((ref) => {
          this.reviews.push({
            id: ref.id,
            ...review,
          })
          this.selectDifficulty = ""
          this.selectFavorite = ""
          this.inputText = ""
        })
    },
  },
  created() {
    firebase
      .firestore()
      .collection(this.reviewCollection)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.reviews.push({
            id: doc.id,
            ...doc.data(),
          })
          this.difficultyArray.push(doc.data().difficulty)
          this.favoriteArray.push(doc.data().favorite)
        })
        let difficultySum = 0
        for (let i = 0; i < this.difficultyArray.length; i++) {
          difficultySum += Number(this.difficultyArray[i])
        }
        this.difficultyAve =
          Math.round((difficultySum / this.difficultyArray.length) * 100) / 100

        let favoriteSum = 0
        for (let i = 0; i < this.favoriteArray.length; i++) {
          favoriteSum += Number(this.favoriteArray[i])
        }
        this.favoriteAve =
          Math.round((favoriteSum / this.favoriteArray.length) * 100) / 100

        firebase
          .firestore()
          .collection(this.bookSubject + "Books")
          .doc(this.bookId)
          .set({
            Subject: this.bookSubject,
            Name: this.bookName,
            Company: this.bookCompany,
            DifficultyAve: this.difficultyAve,
            FavoriteAve: this.favoriteAve,
          })
      })
  },
  // computed: {
  //   Updata: function () {
  //     firebase
  //       .firestore()
  //       .collection(this.bookSubject + "Books")
  //       .doc(this.bookId)
  //       .set({
  //         Name: this.bookName,
  //         Company: this.bookCompany,
  //         DifficultyAve: this.difficultyAve,
  //       })
  //   },
  // },
}
</script>
