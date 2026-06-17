// ==========================================
// STARLIGHT CINEMAS - JAVASCRIPT
// ==========================================

// Movie Database
const moviesData = {
  current: [
    {
      id: 1,
      title: 'Michael',
      date: '23 de abril de 2026',
      duration: '2h 07min',
      genres: 'Biografia, Drama, Filme Musical',
      image: 'https://ae01.alicdn.com/kf/S35511f38da5042f2b0ad9f38ab4cba7eB.jpg'
    },
    {
      id: 2,
      title: 'Super Mario Galaxy – O filme',
      date: '2 de abril de 2026',
      duration: '1h 38min',
      genres: 'Animação, Aventura, Ação, Família',
      image: 'https://cinemococa.com.br/storage/2026/02/667c4e01-f4a6-455b-adce-bf17392f4bd2.webp'
    },
    {
      id: 3,
      title: 'Zuzubalândia - O filme',
      date: '15 de abril de 2026',
      duration: '1h',
      genres: 'Animação, Comédia, Fantasia',
      image: 'https://m.media-amazon.com/images/M/MV5BM2Q3YjZkNWYtZWI2Zi00ZTA0LWIwZTMtNmM4N2QzMWQ2OTNlXkEyXkFqcGc@._V1_.jpg'
    },
    {
      id: 4,
      title: 'Velhos Bandidos',
      date: '2 de abril de 2026',
      duration: '1h 25min',
      genres: 'Ação, Aventura, Comédia',
      image: 'https://ingresso-a.akamaihd.net/prd/img/movie/velhos-bandidos/151d69f8-a505-4752-bbaf-21cf44d83ec1.webp'
    }
  ],
  coming: [
    {
      id: 5,
      title: 'O Drama',
      date: '26 de Julho de 2026',
      duration: '1h 46min',
      genres: 'Comédia, Drama, Romance',
      image: 'https://all.web.img.acsta.net/r_500_x/img/5e/c4/5ec4d2f2da301642ba4c7fc2955d68dc.jpg'
    },
    {
      id: 6,
      title: 'Toy Story 5',
      date: '18 de junho de 2026',
      duration: '1h 47min',
      genres: 'Animação, Aventura, Comédia',
      image: 'https://r2-media.wdwnt.com/2026/02/toy-story-5-international-poster.jpeg'
    },
    {
      id: 7,
      title: 'Mortal Kombat 2',
      date: '30 de junho de 2026',
      duration: '2h',
      genres: 'Ação, Artes Marciais, Fantasia',
      image: 'https://all.web.img.acsta.net/r_2500_x/img/84/0c/840c761f9c3b9111466b071af43c1c1d.jpg'
    },
    {
      id: 8,
      title: 'As Ovelhas Detetives',
      date: '7 de maio de 2026',
      duration: '1h 49m',
      genres: 'Comédia, Mistério',
      image: 'https://m.media-amazon.com/images/M/MV5BYjkwZWU3NDUtYzk0MC00NTZlLWI1NzYtNDE3MTJmYzMyYmFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    }
  ]
};

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const moviesGrid = document.getElementById('moviesGrid');
const comingSoonGrid = document.getElementById('comingSoonGrid');
const bookingForm = document.getElementById('bookingForm');
const movieSelect = document.getElementById('movie');
const quantityInput = document.getElementById('quantity');
const increaseQty = document.getElementById('increaseQty');
const decreaseQty = document.getElementById('decreaseQty');
const bookingSummary = document.getElementById('bookingSummary');
const successMessage = document.getElementById('successMessage');
const whatsappBtn = document.getElementById('whatsappBtn');

// ==========================================
// NAVIGATION AND SCROLLING
// ==========================================

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');

    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';

  const sections = document.querySelectorAll('section, header');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// RENDER MOVIES
// ==========================================

function renderMovies(movies, gridElement) {
  gridElement.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card fade-in-up';
    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/250x380?text=${movie.title}'">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><strong>${movie.date}</strong></p>
        <p>${movie.duration} | ${movie.genres}</p>
      </div>
    `;
    gridElement.appendChild(movieCard);
  });
}

// Initialize movies on page load
renderMovies(moviesData.current, moviesGrid);
renderMovies(moviesData.coming, comingSoonGrid);

// Populate movie select dropdown
function populateMovieSelect() {
  const allMovies = [...moviesData.current, ...moviesData.coming];
  
  allMovies.forEach(movie => {
    const option = document.createElement('option');
    option.value = movie.title;
    option.textContent = movie.title;
    movieSelect.appendChild(option);
  });
}

populateMovieSelect();

// ==========================================
// QUANTITY SELECTOR
// ==========================================

increaseQty.addEventListener('click', (e) => {
  e.preventDefault();
  let quantity = parseInt(quantityInput.value);
  if (quantity < 10) {
    quantity++;
    quantityInput.value = quantity;
    updateBookingSummary();
  }
});

decreaseQty.addEventListener('click', (e) => {
  e.preventDefault();
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
    updateBookingSummary();
  }
});

quantityInput.addEventListener('change', updateBookingSummary);

// ==========================================
// BOOKING SUMMARY
// ==========================================

function updateBookingSummary() {
  const movie = movieSelect.value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const quantity = quantityInput.value;

  if (movie && date && time && quantity) {
    const ticketPrice = 50; // R$ 50 per ticket
    const total = ticketPrice * quantity;

    // Format date
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.getElementById('summaryMovie').textContent = movie;
    document.getElementById('summaryDateTime').textContent = `${formattedDate} às ${time}`;
    document.getElementById('summaryQuantity').textContent = `${quantity} ingresso${quantity > 1 ? 's' : ''}`;
    document.getElementById('summaryTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    bookingSummary.style.display = 'block';
  } else {
    bookingSummary.style.display = 'none';
  }
}

// Update summary when inputs change
movieSelect.addEventListener('change', updateBookingSummary);
document.getElementById('date').addEventListener('change', updateBookingSummary);
document.getElementById('time').addEventListener('change', updateBookingSummary);

// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm() {
  let isValid = true;
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach(group => {
    group.classList.remove('error');
    const errorMsg = group.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.classList.remove('show');
    }
  });

  // Name validation
  const name = document.getElementById('name').value.trim();
  if (!name || name.length < 3) {
    showError('name', 'Nome deve ter pelo menos 3 caracteres');
    isValid = false;
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('email', 'Email inválido');
    isValid = false;
  }

  // Movie validation
  const movie = movieSelect.value;
  if (!movie) {
    showError('movie', 'Selecione um filme');
    isValid = false;
  }

  // Date validation
  const date = document.getElementById('date').value;
  if (!date) {
    showError('date', 'Selecione uma data');
    isValid = false;
  }

  // Time validation
  const time = document.getElementById('time').value;
  if (!time) {
    showError('time', 'Selecione um horário');
    isValid = false;
  }

  // Quantity validation
  const quantity = quantityInput.value;
  if (!quantity || quantity < 1 || quantity > 10) {
    showError('quantity', 'Quantidade inválida');
    isValid = false;
  }

  return isValid;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  const errorMsg = formGroup.querySelector('.error-message');

  formGroup.classList.add('error');
  errorMsg.textContent = message;
  errorMsg.classList.add('show');
}

// ==========================================
// FORM SUBMISSION
// ==========================================

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    scrollToForm();
    return;
  }

  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const movie = movieSelect.value;
  const quantity = quantityInput.value;

  // Generate confirmation code
  const confirmationCode = generateConfirmationCode();

  // Show success message
  document.getElementById('successName').textContent = name;
  document.getElementById('successEmail').textContent = email;
  document.getElementById('confirmationCode').textContent = confirmationCode;

  bookingForm.style.display = 'none';
  successMessage.style.display = 'block';

  // Scroll to success message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Log booking data (in real app, send to server)
  console.log({
    name,
    email,
    movie,
    quantity,
    confirmationCode,
    timestamp: new Date()
  });
});

function generateConfirmationCode() {
  return 'STAR' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function resetBookingForm() {
  bookingForm.reset();
  bookingForm.style.display = 'block';
  successMessage.style.display = 'none';
  bookingSummary.style.display = 'none';
  quantityInput.value = 1;

  // Clear errors
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });

  // Scroll to form
  scrollToForm();
}

function scrollToForm() {
  const ticketsSection = document.getElementById('tickets');
  ticketsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all movie cards and info cards on page load
function setupAnimationObserver() {
  document.querySelectorAll('.movie-card, .info-card, .contact-item').forEach(element => {
    observer.observe(element);
  });
}

// Set up animations after a short delay to ensure elements are in DOM
window.addEventListener('load', setupAnimationObserver);

// Also set up for dynamically rendered elements
setTimeout(setupAnimationObserver, 500);

// ==========================================
// WHATSAPP BUTTON
// ==========================================

// The button is already functional with the href attribute
// Add any additional interaction if needed
whatsappBtn.addEventListener('mouseover', () => {
  whatsappBtn.style.transform = 'scale(1.1)';
});

whatsappBtn.addEventListener('mouseout', () => {
  whatsappBtn.style.transform = 'scale(1)';
});

// ==========================================
// SET MINIMUM DATE FOR DATE PICKER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  dateInput.setAttribute('min', minDate);

  // Set max date to 60 days from now
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  const maxYear = maxDate.getFullYear();
  const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
  const maxDay = String(maxDate.getDate()).padStart(2, '0');
  const maxDateStr = `${maxYear}-${maxMonth}-${maxDay}`;

  dateInput.setAttribute('max', maxDateStr);
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR FOR NAVIGATION
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ==========================================
// INPUT VALIDATION FEEDBACK
// ==========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    const formGroup = input.closest('.form-group');
    const errorMsg = formGroup.querySelector('.error-message');

    if (errorMsg && input.value.trim() === '') {
      formGroup.classList.add('error');
      errorMsg.textContent = 'Este campo é obrigatório';
      errorMsg.classList.add('show');
    } else {
      formGroup.classList.remove('error');
      errorMsg.classList.remove('show');
    }
  });

  input.addEventListener('focus', () => {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.classList.remove('show');
    }
  });
});

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Add aria-labels where needed
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (!link.getAttribute('aria-label') && link.textContent.trim()) {
    link.setAttribute('aria-label', `Navigate to ${link.textContent.trim()}`);
  }
});

// Keyboard navigation for menus
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images (basic implementation)
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// DEBUG HELPER
// ==========================================

// Log when page is fully loaded
window.addEventListener('load', () => {
  console.log('✓ Starlight Cinemas website loaded successfully');
  console.log('✓ Movies loaded:', moviesData.current.length + moviesData.coming.length);
  console.log('✓ All features initialized');
});