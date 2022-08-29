<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Orders",
      orders: [],
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