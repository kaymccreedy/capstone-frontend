<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      store: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.store = !!localStorage.store;
    },
  },
};
</script>

<template>
  <div id="app">
    <header id="header" v-if="!store">
      <div class="content">
        <div class="inner">
          <h1><a href="/">Kay McCreedy</a></h1>
          <p>Writer — Photographer — Musician — Prospective Coder</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/#intro">Intro</a></li>
          <li><a href="/#work">Work</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li><a href="/store">Store</a></li>
        </ul>
      </nav>
    </header>
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
