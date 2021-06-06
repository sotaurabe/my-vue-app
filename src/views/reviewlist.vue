<template>
  <div>
    <div class="book-info">
      <!-- <router-view></router-view> -->
      <h1>{{ bookName }}</h1>
      <h3>{{ bookCompany }}</h3>
      <div class="book-level">
        <h3>
          難易度
          <div class="book-ave">
            <img src="../assets/鉛筆の画像.png" height="20px" />{{
              difficultyAve
            }}
          </div>
        </h3>
        <h3>
          おすすめ度
          <div class="book-ave">
            <img src="../assets/星の画像.png" height="20px" />{{ favoriteAve }}
          </div>
        </h3>
      </div>
    </div>

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
      <div class="reviewlist-box">
        <div v-for="review in reviews" :key="review.id">
          <div class="review-box">
            <div class="review-ave-box">
              <div>
                <p>難易度</p>
                <div class="review-ave">
                  <img src="../assets/鉛筆の画像.png" height="20px" />{{
                    review.difficulty
                  }}
                </div>
              </div>
              <div>
                <p>おすすめ度</p>
                <div class="review-ave">
                  <img src="../assets/星の画像.png" height="20px" />{{
                    review.favorite
                  }}
                </div>
              </div>
            </div>
            <div class="reviewtext-box">
              <p>レビュー</p>
              <div class="review-text">
                {{ review.text }}
              </div>
            </div>
          </div>
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
}
</script>
<style scoped>
.book-info {
  text-align: center;
}
.book-level {
  width: 50%;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.book-ave {
  font-size: 30px;
}

.reviewlist-box {
  width: 60%;
  margin: 0 auto;
  background-color: rgba(65, 105, 225, 0.5);
  padding-top: 30px;
  padding-bottom: 10px;
}
.review-box {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.review-ave-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.review-ave {
  font-size: 25px;
  font-weight: bold;
}
.reviewtext-box {
  width: 90%;
  margin: 0 auto;
}
.review-text {
  margin-bottom: 15px;
  background-color: #cef6f5;
}
</style>
