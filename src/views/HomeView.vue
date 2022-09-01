<script>
import axios from "axios";

export default {
  data: function () {
    return {
      isLoggedIn: false,
      store: false,
      intro: false,
      work: false,
      about: false,
      contact: false,
      photography: false,
      productsIndex: false,
      productShow: false,
      ordersIndex: false,
      other: false,
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
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
      this.other =
        this.store ||
        this.intro ||
        this.work ||
        this.about ||
        this.contact ||
        this.photography ||
        this.productsIndex ||
        this.productsShow ||
        this.ordersIndex;
    },
  },
  created: function () {
    this.indexProducts();
    this.isLoggedIn = !!localStorage.jwt;
    this.indexOrders;
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
      this.productsIndex = false;
      this.productShow = true;
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
    },
    indexOrders: function () {
      axios.get("/orders.json").then((response) => {
        this.orders = response.data;
        console.log("All Orders: ", this.orders);
      });
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
            <li v-if="!store">
              <a href="/#store" @click="(store = true), (productsIndex = true)">
                Store
              </a>
            </li>
            <li v-if="other">
              <a href="/" @click="store = false">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <!-- Main -->
      <div id="main">
        <!-- Intro -->
        <article id="intro" v-if="intro">
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
        <article id="work" v-if="work">
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
        <div v-if="photography">
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
        </div>

        <!-- About -->
        <article id="about" v-if="about">
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
        <article id="contact" v-if="contact">
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
        <div id="store" v-if="store">
          <nav>
            <ul>
              <li><a href="/#productsIndex" @click="productsIndex = true">Products</a></li>
              <li v-if="isLoggedIn">
                <a href="/#ordersIndex" @click="ordersIndex = true">Orders</a>
              </li>
              <li v-if="isLoggedIn"><a href="/logout">Logout</a></li>
              <li v-if="!isLoggedIn"><a href="/login">Login</a></li>
              <li v-if="!isLoggedIn"><a href="/signup">Signup</a></li>
            </ul>
          </nav>

          <!-- Products Index -->
          <article id="productsIndex" v-if="productsIndex">
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
          <article id="productsShow" v-if="productShow">
            {{ showProduct() }}
            <h2 class="major">{{ product.name }}</h2>
            <span class="image product" v-for="image in productImages" v-bind:key="image.id">
              <img :src="image.url" alt="" />
            </span>
            <br />
            <em>{{ product.description }}</em>
            <h5>${{ product.price }}</h5>
            <div v-if="submitted">
              <h5>Order complete!</h5>
              <a :href="`/orders/${orderID}`">View Order</a>
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
            <a href="/#products" @click="(productShow = false), (productsIndex = true)">Back to Products</a>
          </article>
        </div>

        <!-- Orders Index -->
        <article id="ordersIndex" v-if="ordersIndex">
          <h2 class="major">Orders</h2>
          <div v-for="order in orders" v-bind:key="order.id">
            <h4>
              Order ID:
              <a :href="`/orders/${order.id}`">{{ order.id }}</a>
            </h4>
          </div>
        </article>
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
