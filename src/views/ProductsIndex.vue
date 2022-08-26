<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Products",
      products: [],
      productImages: [],
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    indexProducts: function () {
      axios.get("/products.json").then((response) => {
        this.products = response.data;
        console.log("All Products: ", this.products);
      });
    },
    getImages: function (product) {
      this.productImages = [];
      product.images.forEach((image) => {
        this.productImages.push(image.url);
      });
    },
  },
};
</script>

<template>
  <div class="products">
    <h1>{{ message }}</h1>
    <div v-for="product in products" v-bind:key="product.id">
      <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
      <h5>${{ product.price }}</h5>
      {{ getImages(product) }}
      <div>
        <img class="img-small" :src="productImages[0]" />
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<style></style>
