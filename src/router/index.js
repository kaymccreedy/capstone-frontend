import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import ProductsIndex from "../views/ProductsIndex.vue";
import ProductsShow from "../views/ProductsShow.vue";
import OrdersIndex from "../views/OrdersIndex.vue";
import OrdersShow from "../views/OrdersShow.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { path: "/signup", name: "signup", component: SignupView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/logout", name: "logout", component: LogoutView },
  { path: "/products", name: "products-index", component: ProductsIndex },
  { path: "/products/:id", name: "products-show", component: ProductsShow },
  { path: "/orders", name: "orders-index", component: OrdersIndex },
  { path: "/orders/:id", name: "orders-show", component: OrdersShow },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
