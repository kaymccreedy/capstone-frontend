<script>
export default {
  data: function () {
    return {
      message: "Kay's Webstore",
    };
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <router-link to="/products">Products</router-link>
  </div>
</template>

<style></style>
