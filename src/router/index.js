import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AddBooks from "../views/addBooks.vue"
import Science from "../views/Science.vue"
import Fhysics from "../views/science/Fhysics.vue"
import Chemistry from "../views/science/Chemistry.vue"
import Biology from "../views/science/Biology.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
    path: "/fhysics",
    name: "Fhysics",
    component: Fhysics,
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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
