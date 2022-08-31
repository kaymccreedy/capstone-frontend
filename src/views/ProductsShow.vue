<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: [],
      productImages: [],
      orderParams: false,
      submitted: false,
      quantity: "",
      newOrderParams: {},
      errors: [],
      orderID: "",
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
  <article id="product">
    <h2 class="major">{{ product.name }}</h2>
    <span class="image product" v-for="image in productImages" v-bind:key="image.id">
      <img :src="image.url" alt="" />
    </span>
    <em>{{ product.description }}</em>
    <h5>${{ product.price }}</h5>
    <div v-if="submitted">
      <h5>Order complete!</h5>
      <a :href="`/orders/${orderID}`">View Order</a>
    </div>
    <h4>Order</h4>
    <div v-if="!orderParams">
      <label>Quantity:</label>
      <input v-model="quantity" />
      <button @click="createOrder">Order</button>
    </div>
    <div v-if="orderParams">
      <p>Product: {{ product.name }}</p>
      <p>Quantity: {{ newOrderParams.quantity }}</p>
      <p>Subtotal: ${{ newOrderParams.subtotal }}</p>
      <p>Tax: ${{ newOrderParams.tax }}</p>
      <p>Total: ${{ newOrderParams.total }}</p>
      <button @click="submitOrder">Submit Order</button>
    </div>
    <br />
    <br />
    <a href="/products">Back to Products</a>
  </article>
</template>
