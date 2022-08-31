<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Kay's Webstore",
      products: [],
      productImages: {},
      open: false,
      isLoggedIn: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  created: function () {
    this.indexProducts();
    this.store();
  },
  methods: {
    store: function () {
      localStorage.setItem("store", true);
    },
    indexProducts: function () {
      axios.get("/products.json").then((response) => {
        this.products = response.data;
        console.log("All Products: ", this.products);
        this.getImages();
      });
    },
    getImages: function () {
      this.productImages = [];
      this.products.forEach((product) => {
        this.productImages.push(product.images[0].url);
      });
    },
    productIndex: function () {
      document.querySelector("#products-index").showModal();
    },
    closeProductIndex: function () {
      document.querySelector("#products-index").closeModal();
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
  <div class="home">
    <header id="header">
      <div class="content"></div>
      <nav>
        <ul>
          <li><a href="/products">Products</a></li>
          <li><a v-if="!isLoggedIn" href="/orders">Orders</a></li>
          <li><a v-if="!isLoggedIn" href="/logout">Logout</a></li>
          <li><a v-if="isLoggedIn" href="/login">Login</a></li>
          <li><a v-if="isLoggedIn" href="/signup">Signup</a></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style></style>
