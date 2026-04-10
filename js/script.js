// 1. Initialize Lucide Icons (safe helper)
window.safeCreateIcons = function safeCreateIcons() {
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    try {
      lucide.createIcons();
    } catch (err) {
      console.warn('lucide.createIcons() error:', err);
    }
  }
};

// Attempt to initialize immediately, otherwise on load
window.safeCreateIcons();
window.addEventListener('load', window.safeCreateIcons);

// 2. Set dynamic current year in footer
document.getElementById('copyright').innerText = `© ${new Date().getFullYear()} Ramya Bowen`;

// 3. Navbar Scroll Effect (Replacing the React useEffect & state)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Scrolled state
    navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
    navbar.classList.remove('bg-transparent', 'py-6');
  } else {
    // Top state
    navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-4');
    navbar.classList.add('bg-transparent', 'py-6');
  }
});

// 4. Mobile Menu Toggle Logic
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

mobileBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  
  if (isMenuOpen) {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    menuIcon.setAttribute('data-lucide', 'x');
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuIcon.setAttribute('data-lucide', 'menu');
  }
  window.safeCreateIcons(); // Refresh icon rendering
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuIcon.setAttribute('data-lucide', 'menu');
    window.safeCreateIcons();
  });
});

// 5. Scroll Animations (Replacing Framer Motion)
// This uses IntersectionObserver to detect when an element enters the screen
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once the animation has played
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Attach observer to all elements with the animation class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});