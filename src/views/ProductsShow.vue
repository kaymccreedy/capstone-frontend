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
        this.productImages.push(image);
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
    <h5>${{ product.price }}</h5>
    <br />
    {{ getImages(product) }}
    <div v-for="image in productImages" v-bind:key="image.id">
      <img class="img-full" :src="image.url" />
    </div>
    <br />
    <br />
    <router-link to="/products">Back to Products</router-link>
  </div>
</template>
