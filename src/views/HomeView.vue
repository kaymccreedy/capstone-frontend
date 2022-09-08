<script>
import axios from "axios";

export default {
  data: function () {
    return {
      isLoggedIn: false,
      link: "home",
      photos: [],
      photosImages: {},
      photo_id: "",
      photo: [],
      photoImages: [],
      products: [],
      selectedProduct: [],
      product: [],
      quantity: "",
      newOrderParams: {},
      orderParams: false,
      submitted: false,
      errors: [],
      orderID: "",
      orders: [],
      order: [],
      orderProduct: [],
      orderPhoto: [],
      newUserParams: {},
      newSessionParams: {},
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
      localStorage.setItem("link", this.link);
      console.log("Link:", localStorage.link);
      console.log("Orders:", this.orders);
      this.submitted = false;
    },
    selectedProduct() {
      this.products.forEach((product) => {
        if (product.name == this.selectedProduct) {
          this.product = product;
        }
      });
      console.log("Product:", this.product);
    },
  },
  created: function () {
    this.stickyLink();
    this.indexPhotos();
    this.indexProducts();
    this.indexOrders();
    this.showPhotoReload();
    this.showOrderReload();
    console.log("Link:", this.link);
    this.isLoggedIn = !!localStorage.jwt;
  },
  methods: {
    stickyLink: function () {
      if (localStorage.link) {
        this.link = localStorage.link;
      }
    },
    indexPhotos: function () {
      axios.get("/photos.json").then((response) => {
        this.photos = response.data;
        console.log("Photos: ", this.photos);
        this.getPhotosImages();
      });
    },
    getPhotosImages: function () {
      this.photosImages = [];
      this.photos.forEach((photo) => {
        this.photosImages.push(photo.images[0].url);
      });
    },
    selectPhoto: function (id) {
      this.photo_id = id;
      localStorage.setItem("photo_id", this.photo_id);
      this.showPhoto();
      this.link = "photosShow";
    },
    showPhoto: function () {
      axios.get("/photos/" + this.photo_id + ".json").then((response) => {
        this.photo = response.data;
        this.photoImages = this.photo.images;
        console.log("Photo", this.photo);
      });
      this.link = "photosShow";
    },
    showPhotoReload: function () {
      if (localStorage.photo_id && this.link === "photosShow") {
        this.photo_id = localStorage.photo_id;
        this.showPhoto();
      }
    },
    indexProducts: function () {
      axios.get("/products.json").then((response) => {
        this.products = response.data;
        console.log("Products", this.products);
      });
    },
    createOrder: function () {
      this.newOrderParams.quantity = this.quantity;
      this.newOrderParams.photo_id = this.photo.id;
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
      localStorage.setItem("order_id", this.order_id);
      this.showOrder();
    },
    showOrder: function () {
      axios.get("/orders/" + this.order_id + ".json").then((response) => {
        this.order = response.data;
        console.log("Order: ", this.order);
        this.getProductInfo();
        this.getPhotoInfo();
      });
      this.link = "ordersShow";
    },
    showOrderReload: function () {
      if (localStorage.order_id && this.link === "ordersShow") {
        this.order_id = localStorage.order_id;
        this.showOrder();
      }
    },
    getProductInfo: function () {
      var product_id = this.order.product_id;
      axios.get(`/products/${product_id}.json`).then((response) => {
        this.orderProduct = response.data;
        console.log("Product Info: ", this.orderProduct);
      });
    },
    getPhotoInfo: function () {
      var photo_id = this.order.photo_id;
      axios.get(`/photos/${photo_id}.json`).then((response) => {
        this.orderPhoto = response.data;
        console.log("Photo Info: ", this.orderPhoto);
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
          this.link = "store";
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
  <!-- Wrapper -->
  <div id="wrapper">
    <!-- Header -->
    <header id="header" v-if="link === 'home'">
      <div class="content">
        <div class="inner">
          <h1>Kay McCreedy</h1>
          <p>Writer — Photographer — Musician — Prospective Coder</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/#intro" @click="link = 'intro'">Intro</a></li>
          <li><a href="/#work" @click="link = 'work'">Work</a></li>
          <li><a href="/#about" @click="link = 'about'">About</a></li>
          <li><a href="/#contact" @click="link = 'contact'">Contact</a></li>
        </ul>
      </nav>
      <nav id="store">
        <ul>
          <li>
            <a href="/#store" @click="link = 'store'">
              Store
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Store -->
    <div id="header" v-if="link === 'store'">
      <div class="content">
        <div class="inner">
          <h1>Kay McCreedy</h1>
          <p>Writer — Photographer — Musician — Prospective Coder</p>
        </div>
      </div>
      <!-- Store Nav -->
      <div id="store" v-if="link === 'store'">
        <nav>
          <ul>
            <li>
              <a
                href="/#photosIndex"
                @click="
                  {
                    {
                      indexPhotos();
                      link = 'photosIndex';
                    }
                  }
                "
              >
                Photos
              </a>
            </li>
            <li v-if="isLoggedIn">
              <a
                href="/#ordersIndex"
                @click="
                  {
                    {
                      indexOrders();
                      link = 'ordersIndex';
                    }
                  }
                "
              >
                Orders
              </a>
            </li>
            <li v-if="isLoggedIn">
              <a
                href="/#store"
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
            <li v-if="!isLoggedIn"><a href="/#login" @click="link = 'login'">Login</a></li>
            <li v-if="!isLoggedIn"><a href="/#signup" @click="link = 'signup'">Signup</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main -->
    <div id="main" v-if="link !== 'store' && link !== 'home'">
      <!-- Intro -->
      <article id="intro" v-if="(link === 'intro')">
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
      <article id="work" v-if="(link === 'work')">
        <h2 class="major">Work</h2>
        <span class="image main"><img src="images/pic02.jpg" alt="" /></span>
        <p>
          Kay's work at this time encompasses several different mediums and forms, including a broad portfolio of
          nature, landscape, abstract, and portrait photography; an ever-growing collection of unpublished poetry; and
          various musical endeavors currently under development. They also frequently collaborate with other artists in
          the Philadelphia scene on visual art and musical projects, including local band
          <a href="https://chewyphl.com">Chewy</a>
          .
        </p>
        <p>
          You can explore some of Kay's photography in the webstore
          <a href="/#photosIndex" @click="link = 'photosIndex'">here</a>
          .
        </p>
      </article>

      <!-- About -->
      <article id="about" v-if="(link === 'about')">
        <h2 class="major">About</h2>
        <span class="image main"><img src="images/pic03.jpg" alt="" /></span>
        <p>
          Kay McCreedy was born in Berkeley, California and grew up in Bend, Oregon. Despite a strong desire to study
          mathematics or physics, they did not attend college, instead working in various service industry jobs during
          their early adult life. After a period of several years spent travelling around the United States, they
          settled in Philadelphia, where they currently live. Aside from being an avid writer, amateur photographer, and
          self-taught musician, they also have a passion for home-brewed coffee, spirituality, and the New York Times
          Crossword.
        </p>
      </article>

      <!-- Contact -->
      <article id="contact" v-if="(link === 'contact')">
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

      <!-- Photos Index -->
      <article id="photosIndex" class="photograph" v-if="(link === 'photosIndex')">
        <h2 class="major">Photos</h2>
        <p><em>Click on any image below to view products and place an order</em></p>
        <div class="photogrid">
          <span v-for="photo in photos" v-bind:key="photo.id">
            <a href="/#photosShow">
              <img
                class="image grid"
                :src="photosImages[photo.id - 1]"
                alt=""
                @click="
                  {
                    {
                      selectPhoto(photo.id);
                    }
                  }
                "
              />
            </a>
          </span>
        </div>
      </article>

      <!-- Photos Show -->
      <article id="photosShow" class="photograph" v-if="(link === 'photosShow')">
        <h2 class="major">{{ photo.name }}</h2>
        <span v-for="image in photoImages" v-bind:key="image.id">
          <img class="image fit" :src="image.url" alt="" />
        </span>
        <em>{{ photo.description }}</em>
        <br />
        <br />
        <div v-if="!isLoggedIn">
          <h3>
            <em>
              Please
              <a href="/#login" @click="link = 'login'">login</a>
              to place an order
            </em>
          </h3>
        </div>
        <div v-if="isLoggedIn">
          <div v-if="submitted">
            <h3>
              Order complete! •
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
            </h3>
          </div>
          <h3>Order</h3>
          <div v-if="!orderParams">
            <div>Product:</div>
            <select v-model="this.selectedProduct">
              <option disabled value="">Please select one</option>
              <option v-for="product in products" v-bind:key="product.id">{{ product.name }}</option>
            </select>
            <div>Quantity:</div>
            <input class="input" v-model="quantity" text-color: black />
            <button @click="createOrder">Order</button>
          </div>
          <div v-if="orderParams">
            <p class="small">
              <em>subtotal, tax, and total are pre-calculations and may not reflect exact price at checkout</em>
            </p>
            <p>Photo: {{ photo.name }}</p>
            <p>Product: {{ product.name }}</p>
            <p>Quantity: {{ newOrderParams.quantity }}</p>
            <p>Subtotal: ${{ newOrderParams.subtotal }}</p>
            <p>Tax: ${{ newOrderParams.tax }}</p>
            <p>Total: ${{ newOrderParams.total }}</p>
            <button @click="submitOrder">Submit Order</button>
          </div>
        </div>
      </article>

      <!-- Orders Index -->
      <article id="ordersIndex" v-if="(link === 'ordersIndex')">
        <h2 class="major">Orders</h2>
        <div v-if="orders.length == 0">
          <h3>
            <em>
              You have no orders! Go to
              <a href="/#photos" @click="link = 'photosIndex'">Photos</a>
              to find something you like!
            </em>
          </h3>
        </div>
        <div v-if="orders != []">
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
        </div>
      </article>

      <!-- Orders Show -->
      <article id="ordersShow" v-if="(link === 'ordersShow')">
        <h2 class="major">Order #{{ order.id }}</h2>
        <h4>ID: {{ order.id }}</h4>
        <p>
          <b>Photo:</b>
          {{ orderPhoto.name }}
        </p>
        <p>
          <b>Description:</b>
          <em>&nbsp;{{ orderPhoto.description }}</em>
        </p>
        <p>
          <b>Product:</b>
          {{ orderProduct.name }}
        </p>
        <p>
          <b>Product Description:</b>
          <em>&nbsp;{{ orderProduct.description }}</em>
        </p>
        <p>
          <b>Size:</b>
          <em>&nbsp;{{ orderProduct.size }}</em>
        </p>
        <p>
          <b>Price:</b>
          &nbsp;${{ orderProduct.price }}
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
      <article id="signup" v-if="(link === 'signup')">
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
          <input
            type="submit"
            value="Sign Up"
            href="/#login"
            @click="
              {
                {
                  signup();
                  link = 'login';
                }
              }
            "
          />
        </form>
        <h3>
          <em>
            Have an account?
            <a href="/#login" @click="link = 'login'">Login here</a>
          </em>
        </h3>
      </article>

      <!-- Login -->
      <article id="login" v-if="(link === 'login')">
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
          <input
            type="submit"
            value="Submit"
            @click="
              {
                {
                  login();
                }
              }
            "
          />
        </form>
        <h3>
          <em>
            No account?
            <a href="/#signup" @click="link = 'signup'">Signup here</a>
          </em>
        </h3>
      </article>
    </div>

    <!-- Closers -->
    <div v-if="link !== 'home'">
      <nav id="close">
        <ul>
          <li
            v-if="
              link === 'intro' ||
              link === 'work' ||
              link === 'about' ||
              link === 'contact' ||
              link === 'store' ||
              link === 'photography'
            "
          >
            <a href="/#" @click="link = 'home'">
              Home
            </a>
          </li>
          <li v-if="link === 'photosIndex' || link === 'ordersIndex' || link === 'login' || link === 'signup'">
            <a href="/#store" @click="link = 'store'">
              Close
            </a>
          </li>
          <li v-if="link === 'photosShow'">
            <a href="/#photosIndex" @click="link = 'photosIndex'">
              Close
            </a>
          </li>
          <li v-if="link === 'ordersShow'">
            <a href="/#ordersIndex" @click="link = 'ordersIndex'">
              Close
            </a>
          </li>
        </ul>
      </nav>
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
</template>

<style></style>
