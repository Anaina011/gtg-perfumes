// Shop dropdown (no arrow, still functional)
document.querySelector('.dropdown-toggle')
  .addEventListener('click', () => {
    document.querySelector('.dropdown').classList.toggle('active');
  });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

const images = [
  'assets/product-image1.png',
  'assets/product-image2.png',
  'assets/product-image3.png',
  'assets/product-image4.png',
  'assets/product-image1.png',
  'assets/product-image2.png',
  'assets/product-image3.png',
  'assets/product-image4.png'
];

let currentIndex = 0;
const mainImage = document.getElementById('mainImage');
const dotsContainer = document.getElementById('galleryDots');

/* Create dots */
images.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => setImage(i));
  dotsContainer.appendChild(dot);
});

function updateGallery() {
  mainImage.src = images[currentIndex];
  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function setImage(index) {
  currentIndex = index;
  updateGallery();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateGallery();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateGallery();
}

updateGallery();


const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const fragrance1Radios = document.querySelectorAll('input[name="fragrance1"]');
const fragrance2Radios = document.querySelectorAll('input[name="fragrance2"]');

const addToCartBtn = document.getElementById('addToCartBtn');

// Expand / collapse Single vs Double
purchaseRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.subscription-box').forEach(box => {
      box.classList.toggle(
        'active',
        box.dataset.type === radio.value
      );
    });
    updateCartLink();
  });
});

/* ===============================
   ADD TO CART (DYNAMIC LINK)
================================ */

function updateCartLink() {
  if (!addToCartBtn) return;

  const purchase =
    document.querySelector('input[name="purchase"]:checked')?.value;

  let url = `https://example.com/cart?purchase=${purchase}`;

  // SINGLE SUBSCRIPTION
  if (purchase === 'single') {
    const fragrance =
      document.querySelector('input[name="fragrance"]:checked')?.value;
    url += `&fragrance=${fragrance}`;
  }

  // DOUBLE SUBSCRIPTION
  if (purchase === 'double') {
    const fragrance1 =
      document.querySelector('input[name="fragrance1"]:checked')?.value;
    const fragrance2 =
      document.querySelector('input[name="fragrance2"]:checked')?.value;

    url += `&fragrance1=${fragrance1}&fragrance2=${fragrance2}`;
  }

  addToCartBtn.href = url;
}

// Listen fragrance changes
fragranceRadios.forEach(radio =>
  radio.addEventListener('change', updateCartLink)
);

fragrance1Radios.forEach(radio =>
  radio.addEventListener('change', updateCartLink)
);

fragrance2Radios.forEach(radio =>
  radio.addEventListener('change', updateCartLink)
);

// Init cart link
updateCartLink();

/* ===============================
   OUR COLLECTION ACCORDION
================================ */

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.icon').textContent = '+';
    });

    // Open current
    if (!isOpen) {
      item.classList.add('active');
      header.querySelector('.icon').textContent = '−';
    }
  });
});


/* ===============================
   PERCENTAGE COUNT-UP ON SCROLL
================================ */

const counters = document.querySelectorAll('.count');
let hasCounted = false;

function startCountUp() {
  if (hasCounted) return;

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 100)); // slower & smoother

    const updateCount = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + '%';
      } else {
        counter.textContent = current + '%';
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  });

  hasCounted = true;
}

const statsSection = document.getElementById('statsSection');

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      startCountUp();
    }
  },
  {
    threshold: 0.3   // ✅ FIXED
  }
);

observer.observe(statsSection);


/* ===============================
   SCROLL ANIMATION OBSERVER
================================ */
const animatedElements = document.querySelectorAll('.animate');

const animationObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.2
  }
);

animatedElements.forEach(el => animationObserver.observe(el));
