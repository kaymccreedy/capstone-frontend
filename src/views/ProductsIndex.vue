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
        this.getImages();
      });
    },
    getImages: function () {
      this.productImages = [];
      this.products.forEach((product) => {
        this.productImages.push(product.images[0].url);
      });
    },
  },
};
</script>

<template>
  <!-- <div class="products"> -->
  <article id="products">
    <h2 class="major">Products</h2>
    <p>Click on any image below to learn more</p>
    <span class="image product" v-for="product in products" v-bind:key="product.id">
      <a class="image" :href="`/products/${product.id}`"><img :src="productImages[product.id - 1]" alt="" /></a>
    </span>
  </article>
  <!-- <h1>{{ message }}</h1>
    <div v-for="product in products" v-bind:key="product.id">
      <router-link class="link" :to="`/products/${product.id}`">{{ product.name }}</router-link>
      {{ getImages(product) }}
      <div>
        <img class="img-small" :src="productImages[0]" />
      </div>
      <h5>${{ product.price }}</h5>
      <br />
      <br />
    </div> -->
  <!-- </div> -->
</template>

<style></style>
