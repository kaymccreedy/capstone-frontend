<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: [],
      productImages: [],
    };
  },
  created: function () {
    this.showProduct();
  },
  methods: {
    showProduct: function () {
      axios.get("/products/" + this.$route.params.id + ".json").then((response) => {
        this.product = response.data;
        console.log("Product", this.product);
      });
    },
    getImages: function (product) {
      this.productImages = [];
      product.images.forEach((image) => {
        this.productImages.push(image.url);
      });
    },
    destroyProduct: function () {
      axios.delete("/products/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.$router.push("/products");
      });
    },
  },
};
</script>

<template>
  <div class="product">
    <h4>{{ product.name }}</h4>
    <br />
    <p>{{ product.body }}</p>
    <br />
    <br />
    <router-link to="/products">Back to Products</router-link>
    |
    <router-link :to="`/products/${product.id}/edit`">Edit Product</router-link>
    <br />
    <div class="link" v-on:click="destroyProduct">Delete Product</div>
  </div>
</template>
