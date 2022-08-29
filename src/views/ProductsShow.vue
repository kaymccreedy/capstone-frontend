<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: [],
      productImages: [],
      order: false,
      quantity: "",
      newOrderParams: {},
      errors: [],
    };
  },
  created: function () {
    this.showProduct();
  },
  methods: {
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
      this.order = true;
    },
    submitOrder: function () {
      this.newOrderParams.status = "completed";
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid quantity"];
        });
      this.quantity = "";
    },
  },
};
</script>

<template>
  <div class="product">
    <h4>{{ product.name }}</h4>
    <!-- {{ getImages() }} -->
    <div v-for="image in productImages" v-bind:key="image.id">
      <img class="img-full" :src="image.url" />
    </div>
    <em>{{ product.description }}</em>
    <h5>${{ product.price }}</h5>
    <h4>Order</h4>
    <div v-if="!order">
      <label>Quantity:</label>
      <input v-model="quantity" />
      <button @click="createOrder">Order</button>
    </div>
    <div v-if="order">
      <p>Product: {{ product.name }}</p>
      <p>Quantity: {{ newOrderParams.quantity }}</p>
      <p>Subtotal: ${{ newOrderParams.subtotal }}</p>
      <p>Tax: ${{ newOrderParams.tax }}</p>
      <p>Total: ${{ newOrderParams.total }}</p>
      <button @click="submitOrder">Submit Order</button>
    </div>
    <br />
    <br />
    <router-link to="/products">Back to Products</router-link>
  </div>
</template>
