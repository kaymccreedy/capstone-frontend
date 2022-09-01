<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      store: false,
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
      this.store = !!localStorage.store;
    },
  },
  methods: {
    notStore: function () {
      localStorage.setItem("store", false);
    },
  },
};
</script>

<template>
  <div id="app">
    <router-view />
    <!-- <footer id="footer">
      <p class="copyright">
        &copy; Kay McCreedy. Design:
        <a href="https://html5up.net">HTML5 UP</a>
        . Photos: Kay McCreedy
      </p>
    </footer> -->
  </div>
</template>

<style></style>
