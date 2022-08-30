<script>
import axios from "axios";

export default {
  data: function () {
    return {
      order: [],
      message: "",
      product: [],
    };
  },
  created: function () {
    this.showOrder();
  },
  methods: {
    showOrder: function () {
      axios.get("/orders/" + this.$route.params.id + ".json").then((response) => {
        this.order = response.data;
        this.message = "Order #" + response.data.id;
        console.log("Order: ", this.order);
        this.getProductInfo();
      });
    },
    getProductInfo: function () {
      var product_id = this.order.product_id;
      axios.get(`/products/${product_id}.json`).then((response) => {
        this.product = response.data;
        console.log("Product Info: ", this.product);
      });
    },
  },
};
</script>

<template>
  <div class="order">
    <h1>{{ message }}</h1>
    <h4>ID: {{ order.id }}</h4>
    <p>
      <b>Product:</b>
      {{ product.name }}
    </p>
    <p>
      <b>Description:</b>
      <em>&nbsp;{{ product.description }}</em>
    </p>
    <p>
      <b>Size:</b>
      <em>&nbsp;{{ product.size }}</em>
    </p>
    <p>
      <b>Quantity:</b>
      &nbsp;{{ order.quantity }}
    </p>
    <p>
      <b>Subtotal:</b>
      &nbsp;${{ order.subtotal }}
    </p>
    <p>
      <b>Tax:</b>
      &nbsp;${{ order.tax }}
    </p>
    <p>
      <b>Total:</b>
      &nbsp;${{ order.total }}
    </p>
  </div>
</template>
