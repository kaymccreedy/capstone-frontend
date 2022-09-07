<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <router-view />
</template>

<style></style>
