<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Orders",
      orders: [],
      num: "",
    };
  },
  created: function () {
    this.indexOrders();
  },
  methods: {
    indexOrders: function () {
      axios.get("/orders.json").then((response) => {
        this.orders = response.data;
        console.log("All Orders: ", this.orders);
      });
    },
    randomNum: function () {
      this.num = Math.floor(Math.random() * 10000);
    },
  },
};
</script>

<template>
  <div class="orders">
    <h1>{{ message }}</h1>
    <div v-for="order in orders" v-bind:key="order.id">
      {{ randomNum() }}
      <h4>
        Order ID:
        <a :href="`/orders/${order.id}`">{{ order.id }}</a>
      </h4>
    </div>
  </div>
</template>
