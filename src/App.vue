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
  <!-- <footer id="footer">
      <p class="copyright">
        &copy; Kay McCreedy. Design:
        <a href="https://html5up.net">HTML5 UP</a>
        . Photos: Kay McCreedy
      </p>
    </footer> -->
</template>

<style></style>
