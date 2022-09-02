<script>
import axios from "axios";

export default {
  data: function () {
    return {
      isLoggedIn: false,
      products: [],
      productsImages: {},
      product_id: "",
      product: [],
      productImages: [],
      quantity: "",
      newOrderParams: {},
      orderParams: false,
      submitted: false,
      errors: [],
      orderID: "",
      orders: [],
      order: [],
      orderProduct: [],
      newUserParams: {},
      newSessionParams: {},
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  created: function () {
    this.indexProducts();
    this.isLoggedIn = !!localStorage.jwt;
  },
  methods: {
    indexProducts: function () {
      axios.get("/products.json").then((response) => {
        this.products = response.data;
        console.log("Products: ", this.products);
        this.getProductsImages();
      });
    },
    getProductsImages: function () {
      this.productsImages = [];
      this.products.forEach((product) => {
        this.productsImages.push(product.images[0].url);
      });
    },
    selectProduct: function (id) {
      this.product_id = id;
      this.showProduct();
    },
    showProduct: function () {
      axios.get("/products/" + this.product_id + ".json").then((response) => {
        this.product = response.data;
        this.productImages = this.product.images;
        console.log("Product", this.product);
      });
    },
    createOrder: function () {
      this.newOrderParams.quantity = this.quantity;
      this.newOrderParams.product_id = this.product.id;
      this.newOrderParams.subtotal = this.quantity * this.product.price;
      this.newOrderParams.tax = this.newOrderParams.subtotal * 0.09;
      this.newOrderParams.total = this.newOrderParams.subtotal + this.newOrderParams.tax;
      this.orderParams = true;
      this.newOrderParams.subtotal = this.newOrderParams.subtotal.toFixed(2);
      this.newOrderParams.tax = this.newOrderParams.tax.toFixed(2);
      this.newOrderParams.total = this.newOrderParams.total.toFixed(2);
      console.log("Order:", this.newOrderParams);
    },
    submitOrder: function () {
      this.submitted = true;
      axios
        .post("/orders", this.newOrderParams)
        .then((response) => {
          this.orderID = response.data.id;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid quantity"];
        });
      this.quantity = "";
      this.orderParams = false;
      this.indexOrders();
      console.log(this.orders);
    },
    indexOrders: function () {
      axios.get("/orders.json").then((response) => {
        this.orders = response.data;
        console.log("All Orders: ", this.orders);
      });
    },
    selectOrder: function (id) {
      this.order_id = id;
      this.showOrder();
    },
    showOrder: function () {
      axios.get("/orders/" + this.order_id + ".json").then((response) => {
        this.order = response.data;
        this.message = "Order #" + response.data.id;
        console.log("Order: ", this.order);
        this.getProductInfo();
      });
    },
    getProductInfo: function () {
      var product_id = this.order.product_id;
      axios.get(`/products/${product_id}.json`).then((response) => {
        this.orderProduct = response.data;
        console.log("Product Info: ", this.orderProduct);
      });
    },
    signup: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/#login");
          this.newUserParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    login: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/#store");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/#store");
    },
  },
};
</script>

<template>
  <body>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Header -->
      <header id="header">
        <div class="content">
          <div class="inner">
            <h1><a href="/">Kay McCreedy</a></h1>
            <p>Writer — Photographer — Musician — Prospective Coder</p>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/#intro" @click="intro = true">Intro</a></li>
            <li><a href="/#work" @click="work = true">Work</a></li>
            <li><a href="/#about" @click="about = true">About</a></li>
            <li><a href="/#contact" @click="contact = true">Contact</a></li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <a href="/#store">
                Store
              </a>
            </li>
            <li>
              <a href="/">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <!-- Main -->
      <div id="main">
        <!-- Intro -->
        <article id="intro">
          <h2 class="major">Intro</h2>
          <span class="image main"><img src="images/pic01.jpg" alt="" /></span>
          <p>
            Kay McCreedy is a writer, photographer, and musician based out of Philadelphia. Finding that such pursuits,
            while personally meaningful, are not particularly effective ways of earning a living, they have turned to
            coding, and are hoping to plunge into the tech world by way of a coding bootcamp. If you are interested to
            peruse their creative work, head
            <a href="#work">here</a>
            to learn more.
          </p>
          <p>
            However, if you've found your way to this site, you're most likely checking out Kay's coding skills. In that
            case, go ahead and take a look around—they're confident you'll like what you see.
          </p>
        </article>

        <!-- Work -->
        <article id="work">
          <h2 class="major">Work</h2>
          <span class="image main"><img src="images/pic02.jpg" alt="" /></span>
          <p>
            Kay's work at this time encompasses several different mediums and forms, including a broad portfolio of
            nature, landscape, abstract, and portrait photography; an ever-growing collection of unpublished poetry; and
            various musical endeavors currently under development. They also frequently collaborate with other artists
            in the Philadelphia scene on visual art and musical projects, including local band
            <a href="https://chewyphl.com">Chewy</a>
            .
          </p>
          <p>
            You can explore some of Kay's photography
            <a href="#photography">here</a>
            .
          </p>
        </article>

        <!-- Photography -->
        <article id="photography">
          <h2 class="major">Photography</h2>
          <span class="image main"><img src="images/pic04.jpg" alt="" /></span>
          <p>Below is a small selection of Kay's photography.</p>
          <span class="image left">
            <a class="image" href="#pic05"><img src="images/pic05.jpg" alt="" /></a>
          </span>
          <span class="image right">
            <a class="image" href="#pic06"><img src="images/pic06.jpg" alt="" /></a>
          </span>
          <span class="image left">
            <a class="image" href="#pic07"><img src="images/pic07.jpg" alt="" /></a>
          </span>
          <span class="image right">
            <a class="image" href="#pic08"><img src="images/pic08.jpg" alt="" /></a>
          </span>
          <span class="image left">
            <a class="image" href="#pic09"><img src="images/pic09.jpg" alt="" /></a>
          </span>
          <span class="image right">
            <a class="image" href="#pic10"><img src="images/pic10.jpg" alt="" /></a>
          </span>
          <span class="image left">
            <a class="image" href="#pic11"><img src="images/pic11.jpg" alt="" /></a>
          </span>
          <span class="image right">
            <a class="image" href="#pic12"><img src="images/pic12.jpg" alt="" /></a>
          </span>
        </article>

        <!-- Pic05 -->
        <article class="photograph" id="pic05">
          <span class="image fit"><img src="images/pic05.jpg" alt="" /></span>
          <nav><a href="#photography">&#129044; Back</a></nav>
        </article>

        <!-- Pic06 -->
        <article class="photograph" id="pic06">
          <span class="image fit"><img src="images/pic06.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic07 -->
        <article class="photograph" id="pic07">
          <span class="image fit"><img src="images/pic07.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic08 -->
        <article class="photograph" id="pic08">
          <span class="image fit"><img src="images/pic08.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic09 -->
        <article class="photograph" id="pic09">
          <span class="image fit"><img src="images/pic09.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic10 -->
        <article class="photograph" id="pic10">
          <span class="image fit"><img src="images/pic10.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic11 -->
        <article class="photograph" id="pic11">
          <span class="image fit"><img src="images/pic11.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- Pic12 -->
        <article class="photograph" id="pic12">
          <span class="image fit"><img src="images/pic12.jpg" alt="" /></span>
          <p><a href="#photography">&#129044; Back</a></p>
        </article>

        <!-- About -->
        <article id="about">
          <h2 class="major">About</h2>
          <span class="image main"><img src="images/pic03.jpg" alt="" /></span>
          <p>
            Kay McCreedy was born in Berkeley, California and grew up in Bend, Oregon. Despite a strong desire to study
            mathematics or physics, they did not attend college, instead working in various service industry jobs during
            their early adult life. After a period of several years spent travelling around the United States, they
            settled in Philadelphia, where they currently live. Aside from being an avid writer, amateur photographer,
            and self-taught musician, they also have a passion for home-brewed coffee, spirituality, and the New York
            Times Crossword.
          </p>
        </article>

        <!-- Contact -->
        <article id="contact">
          <h2 class="major">Contact</h2>
          <form name="contact" netlify>
            <div class="fields">
              <div class="field half">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div class="field half">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea name="message" id="message" rows="4"></textarea>
              </div>
            </div>
            <ul class="actions">
              <li><input type="submit" value="Send Message" class="primary" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </form>
          <ul class="icons">
            <li>
              <a href="https://facebook.com/kaymccreedy" class="icon brands fa-facebook-f">
                <span class="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/no.shore" class="icon brands fa-instagram">
                <span class="label">Instagram</span>
              </a>
            </li>
          </ul>
        </article>

        <!-- Store -->
        <div id="store">
          <nav>
            <ul>
              <li>
                <a
                  href="/#productsIndex"
                  @click="
                    {
                      {
                        indexProducts();
                      }
                    }
                  "
                >
                  Products
                </a>
              </li>
              <li v-if="isLoggedIn">
                <a
                  href="/#ordersIndex"
                  @click="
                    {
                      {
                        indexOrders();
                      }
                    }
                  "
                >
                  Orders
                </a>
              </li>
              <li v-if="isLoggedIn">
                <a
                  @click="
                    {
                      {
                        logout();
                      }
                    }
                  "
                >
                  Logout
                </a>
              </li>
              <li v-if="!isLoggedIn"><a href="/#login">Login</a></li>
              <li v-if="!isLoggedIn"><a href="/#signup">Signup</a></li>
            </ul>
          </nav>

          <!-- Products Index -->
          <article id="productsIndex">
            <h2 class="major">Products</h2>
            <p>Click on any image below to learn more</p>
            <span class="image product" v-for="product in products" v-bind:key="product.id">
              <a
                class="image"
                @click="
                  {
                    {
                      selectProduct(product.id);
                    }
                  }
                "
                href="/#productsShow"
              >
                <img :src="productsImages[product.id - 1]" alt="" />
              </a>
            </span>
          </article>

          <!-- Products Show -->
          <article id="productsShow">
            <h2 class="major">{{ product.name }}</h2>
            <span class="image product" v-for="image in productImages" v-bind:key="image.id">
              <img :src="image.url" alt="" />
            </span>
            <br />
            <em>{{ product.description }}</em>
            <h5>${{ product.price }}</h5>
            <div v-if="submitted">
              <h5>Order complete!</h5>
              <a
                href="/#ordersShow"
                @click="
                  {
                    {
                      selectOrder(orderID);
                    }
                  }
                "
              >
                View Order
              </a>
            </div>
            <h4>Order</h4>
            <div v-if="!orderParams">
              <label>Quantity:</label>
              <input v-model="quantity" />
              <button @click="createOrder">Order</button>
            </div>
            <div v-if="orderParams">
              <p>Product: {{ product.name }}</p>
              <p>Quantity: {{ newOrderParams.quantity }}</p>
              <p>Subtotal: ${{ newOrderParams.subtotal }}</p>
              <p>Tax: ${{ newOrderParams.tax }}</p>
              <p>Total: ${{ newOrderParams.total }}</p>
              <button @click="submitOrder">Submit Order</button>
            </div>
            <br />
            <br />
            <a href="/#products" @click="this.orderParams = false">Back to Products</a>
          </article>

          <!-- Orders Index -->
          <article id="ordersIndex">
            <h2 class="major">Orders</h2>
            <div v-for="order in orders" v-bind:key="order.id">
              <h4>
                Order ID:
                <a
                  class="image"
                  @click="
                    {
                      {
                        selectOrder(order.id);
                      }
                    }
                  "
                  href="/#ordersShow"
                >
                  {{ order.id }}
                </a>
              </h4>
            </div>
          </article>

          <!-- Orders Show -->
          <article id="ordersShow">
            <h2 class="major">Order #</h2>
            <h4>ID: {{ order.id }}</h4>
            <p>
              <b>Product:</b>
              {{ orderProduct.name }}
            </p>
            <p>
              <b>Description:</b>
              <em>&nbsp;{{ orderProduct.description }}</em>
            </p>
            <p>
              <b>Size:</b>
              <em>&nbsp;{{ orderProduct.size }}</em>
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
          </article>

          <!-- Signup -->
          <article id="signup">
            <form v-on:submit.prevent="signup()">
              <h1>Signup</h1>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div>
                <label>Name:</label>
                <input type="text" v-model="newUserParams.name" />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" v-model="newUserParams.email" />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" v-model="newUserParams.password" />
              </div>
              <div>
                <label>Password confirmation:</label>
                <input type="password" v-model="newUserParams.password_confirmation" />
              </div>
              <input type="submit" value="Sign Up" />
            </form>
          </article>

          <!-- Login -->
          <article id="login">
            <form v-on:submit.prevent="login()">
              <h1>Login</h1>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div>
                <label>Email:</label>
                <input type="email" v-model="newSessionParams.email" />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" v-model="newSessionParams.password" />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </article>
        </div>
      </div>

      <!-- Footer -->
      <footer id="footer">
        <p class="copyright">
          &copy; Kay McCreedy. Design:
          <a href="https://html5up.net">HTML5 UP</a>
          . Photos: Kay McCreedy
        </p>
      </footer>
    </div>

    <!-- BG -->
    <div id="bg"></div>

    <!-- Scripts -->
    <!-- <script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script> -->
  </body>
</template>

<style>
img {
  width: 90vw;
  margin: auto;
}
</style>
