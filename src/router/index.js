import Vue from "vue"
import VueRouter from "vue-router"
//import Home from "../views/Home.vue"
import AddBooks from "../views/addBooks.vue"
import Science from "../views/Science.vue"
import Physics from "../views/science/Physics.vue"
import Chemistry from "../views/science/Chemistry.vue"
import Biology from "../views/science/Biology.vue"

import ReviewList from "../views/reviewlist.vue"

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/addBooks",
    name: "AddBooks",
    component: AddBooks,
  },
  {
    path: "/science",
    name: "Science",
    component: Science,
  },
  {
    path: "/physics",
    name: "Physics",
    component: Physics,
  },
  {
    path: "/chemistry",
    name: "Chemistry",
    component: Chemistry,
  },
  {
    path: "/biology",
    name: "Biology",
    component: Biology,
  },
  {
    path: "/reviewList",
    name: "ReviewList",
    component: ReviewList,
    //props: true,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
