<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Kay's Webstore",
      products: [],
      productsImages: {},
      productImages: [],
      isLoggedIn: false,
      quantity: "",
      newOrderParams: {},
      orderParams: false,
      submitted: true,
    };
  },
  // watch: {
  //   $route() {
  //     this.isLoggedIn = !!localStorage.jwt;
  //   },
  // },
  created: function () {
    this.indexProducts();
    this.isLoggedIn = !!localStorage.jwt;
  },
  methods: {
    store: function () {
      localStorage.setItem("store", true);
    },
    indexProducts: function () {
      axios.get("/products.json").then((response) => {
        this.products = response.data;
        console.log("All Products: ", this.products);
        this.getProductsImages();
      });
    },
    getProductsImages: function () {
      this.productsImages = [];
      this.products.forEach((product) => {
        this.productsImages.push(product.images[0].url);
      });
    },
    productIndex: function () {
      document.querySelector("#products-index").showModal();
    },
    showProduct: function () {
      axios.get("/products/" + this.$route.params.id + ".json").then((response) => {
        this.product = response.data;
        this.productImages = this.product.images;
        console.log("Product", this.product);
      });
    },
    createOrder: function () {
      this.newOrderParams.quantity = this.quantity;
      this.newOrderParams.product_id = this.product.id;
      this.newOrderParams.subtotal = this.quantity * this.product.price;
      this.newOrderParams.tax = this.newOrderParams.subtotal * 0.09;
      this.newOrderParams.total = this.newOrderParams.subtotal + this.newOrderParams.tax;
      this.orderParams = true;
    },
    submitOrder: function () {
      this.submitted = true;
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          this.orderID = response.data.id;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid quantity"];
        });
      this.quantity = "";
      this.orderParams = false;
    },
  },
};
</script>

<template>
  <div class="store">
    <header id="header">
      <div class="content"></div>
      <nav>
        <ul>
          <li><a href="/#products">Products</a></li>
          <li v-if="isLoggedIn"><a href="/orders">Orders</a></li>
          <li v-if="isLoggedIn"><a href="/logout">Logout</a></li>
          <li v-if="!isLoggedIn"><a href="/login">Login</a></li>
          <li v-if="!isLoggedIn"><a href="/signup">Signup</a></li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
    </header>
    <!-- <div id="main">
      <article id="products">
        <h2 class="major">Products</h2>
        <p>Click on any image below to learn more</p>
        <span class="image product" v-for="product in products" v-bind:key="product.id">
          <a class="image" :href="`/products/${product.id}`"><img :src="productImages[product.id - 1]" alt="" /></a>
        </span>
      </article>
    </div> -->
  </div>
</template>

<style></style>
