<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<template>
  <nav>
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/products">Products</router-link>
    <router-link class="link" v-if="isLoggedIn" to="/orders">Orders</router-link>
    <router-link class="link" v-if="!isLoggedIn" to="/signup">Signup</router-link>
    <router-link class="link" v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link class="link" v-if="isLoggedIn" to="/logout">Logout</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin: auto;
  width: 30vw;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.img-small {
  width: 300px;
}

.img-full {
  width: 90vw;
}

.link {
  margin: 10px;
}
</style>
