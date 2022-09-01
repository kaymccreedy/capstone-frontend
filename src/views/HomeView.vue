<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      store: false,
      intro: false,
      work: false,
      about: false,
      contact: false,
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
      this.store = !!localStorage.store;
    },
  },
  methods: {},
};
</script>

<template>
  <div class="app">
    <body class="is-preload">
      <!-- Wrapper -->
      <div id="wrapper">
        <!-- Header -->
        <!-- <header id="header">
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
		</header> -->

        <div id="app"></div>

        <!-- Main -->
        <div id="main">
          <!-- Intro -->
          <article id="intro">
            <h2 class="major">Intro</h2>
            <span class="image main"><img src="images/pic01.jpg" alt="" /></span>
            <p>
              Kay McCreedy is a writer, photographer, and musician based out of Philadelphia. Finding that such
              pursuits, while personally meaningful, are not particularly effective ways of earning a living, they have
              turned to coding, and are hoping to plunge into the tech world by way of a coding bootcamp. If you are
              interested to peruse their creative work, head
              <a href="#work">here</a>
              to learn more.
            </p>
            <p>
              However, if you've found your way to this site, you're most likely checking out Kay's coding skills. In
              that case, go ahead and take a look around—they're confident you'll like what you see.
            </p>
          </article>

          <!-- Work -->
          <article id="work">
            <h2 class="major">Work</h2>
            <span class="image main"><img src="images/pic02.jpg" alt="" /></span>
            <p>
              Kay's work at this time encompasses several different mediums and forms, including a broad portfolio of
              nature, landscape, abstract, and portrait photography; an ever-growing collection of unpublished poetry;
              and various musical endeavors currently under development. They also frequently collaborate with other
              artists in the Philadelphia scene on visual art and musical projects, including local band
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
              Kay McCreedy was born in Berkeley, California and grew up in Bend, Oregon. Despite a strong desire to
              study mathematics or physics, they did not attend college, instead working in various service industry
              jobs during their early adult life. After a period of several years spent travelling around the United
              States, they settled in Philadelphia, where they currently live. Aside from being an avid writer, amateur
              photographer, and self-taught musician, they also have a passion for home-brewed coffee, spirituality, and
              the New York Times Crossword.
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

          <!-- Elements -->
          <article id="elements">
            <h2 class="major">Elements</h2>

            <section>
              <h3 class="major">Text</h3>
              <p>
                This is
                <b>bold</b>
                and this is
                <strong>strong</strong>
                . This is
                <i>italic</i>
                and this is
                <em>emphasized</em>
                . This is
                <sup>superscript</sup>
                text and this is
                <sub>subscript</sub>
                text. This is
                <u>underlined</u>
                and this is code:
                <code>for (;;) { ... }</code>
                . Finally,
                <a href="#">this is a link</a>
                .
              </p>
              <hr />
              <h2>Heading Level 2</h2>
              <h3>Heading Level 3</h3>
              <h4>Heading Level 4</h4>
              <h5>Heading Level 5</h5>
              <h6>Heading Level 6</h6>
              <hr />
              <h4>Blockquote</h4>
              <blockquote>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget tempus euismod.
                Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan faucibus. Vestibulum ante ipsum primis in faucibus lorem ipsum dolor sit amet nullam
                adipiscing eu felis.
              </blockquote>
              <h4>Preformatted</h4>
              <pre><code>i = 0;

while (!deck.isInOrder()) {
print 'Iteration ' + i;
deck.shuffle();
i++;
}

print 'It took ' + i + ' iterations to sort the deck.';</code></pre>
            </section>

            <section>
              <h3 class="major">Lists</h3>

              <h4>Unordered</h4>
              <ul>
                <li>Dolor pulvinar etiam.</li>
                <li>Sagittis adipiscing.</li>
                <li>Felis enim feugiat.</li>
              </ul>

              <h4>Alternate</h4>
              <ul class="alt">
                <li>Dolor pulvinar etiam.</li>
                <li>Sagittis adipiscing.</li>
                <li>Felis enim feugiat.</li>
              </ul>

              <h4>Ordered</h4>
              <ol>
                <li>Dolor pulvinar etiam.</li>
                <li>Etiam vel felis viverra.</li>
                <li>Felis enim feugiat.</li>
                <li>Dolor pulvinar etiam.</li>
                <li>Etiam vel felis lorem.</li>
                <li>Felis enim et feugiat.</li>
              </ol>
              <h4>Icons</h4>
              <ul class="icons">
                <li>
                  <a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a>
                </li>
                <li>
                  <a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a>
                </li>
                <li>
                  <a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a>
                </li>
                <li>
                  <a href="#" class="icon brands fa-github"><span class="label">Github</span></a>
                </li>
              </ul>

              <h4>Actions</h4>
              <ul class="actions">
                <li><a href="#" class="button primary">Default</a></li>
                <li><a href="#" class="button">Default</a></li>
              </ul>
              <ul class="actions stacked">
                <li><a href="#" class="button primary">Default</a></li>
                <li><a href="#" class="button">Default</a></li>
              </ul>
            </section>

            <section>
              <h3 class="major">Buttons</h3>
              <ul class="actions">
                <li><a href="#" class="button primary">Primary</a></li>
                <li><a href="#" class="button">Default</a></li>
              </ul>
              <ul class="actions">
                <li><a href="#" class="button">Default</a></li>
                <li><a href="#" class="button small">Small</a></li>
              </ul>
              <ul class="actions">
                <li><a href="#" class="button primary icon solid fa-download">Icon</a></li>
                <li><a href="#" class="button icon solid fa-download">Icon</a></li>
              </ul>
              <ul class="actions">
                <li><span class="button primary disabled">Disabled</span></li>
                <li><span class="button disabled">Disabled</span></li>
              </ul>
            </section>

            <section>
              <h3 class="major">Form</h3>
              <form method="post" action="#">
                <div class="fields">
                  <div class="field half">
                    <label for="demo-name">Name</label>
                    <input type="text" name="demo-name" id="demo-name" value="" placeholder="Jane Doe" />
                  </div>
                  <div class="field half">
                    <label for="demo-email">Email</label>
                    <input type="email" name="demo-email" id="demo-email" value="" placeholder="jane@untitled.tld" />
                  </div>
                  <div class="field">
                    <label for="demo-category">Category</label>
                    <select name="demo-category" id="demo-category">
                      <option value="">-</option>
                      <option value="1">Manufacturing</option>
                      <option value="1">Shipping</option>
                      <option value="1">Administration</option>
                      <option value="1">Human Resources</option>
                    </select>
                  </div>
                  <div class="field half">
                    <input type="radio" id="demo-priority-low" name="demo-priority" checked />
                    <label for="demo-priority-low">Low</label>
                  </div>
                  <div class="field half">
                    <input type="radio" id="demo-priority-high" name="demo-priority" />
                    <label for="demo-priority-high">High</label>
                  </div>
                  <div class="field half">
                    <input type="checkbox" id="demo-copy" name="demo-copy" />
                    <label for="demo-copy">Email me a copy</label>
                  </div>
                  <div class="field half">
                    <input type="checkbox" id="demo-human" name="demo-human" checked />
                    <label for="demo-human">Not a robot</label>
                  </div>
                  <div class="field">
                    <label for="demo-message">Message</label>
                    <textarea
                      name="demo-message"
                      id="demo-message"
                      placeholder="Enter your message"
                      rows="6"
                    ></textarea>
                  </div>
                </div>
                <ul class="actions">
                  <li><input type="submit" value="Send Message" class="primary" /></li>
                  <li><input type="reset" value="Reset" /></li>
                </ul>
              </form>
            </section>
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
  </div>
</template>

<style></style>
