document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('open');
  });

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevSlideBtn = document.querySelector('.prev-slide');
  const nextSlideBtn = document.querySelector('.next-slide');
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove('active'));
      slides[index].classList.add('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  }

  if (slides.length > 0) {
      showSlide(currentSlide);
      let sliderInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

      prevSlideBtn.addEventListener('click', () => {
          prevSlide();
          clearInterval(sliderInterval);
          sliderInterval = setInterval(nextSlide, 5000);
      });

      nextSlideBtn.addEventListener('click', () => {
          nextSlide();
          clearInterval(sliderInterval);
          sliderInterval = setInterval(nextSlide, 5000);
      });
  }

  // Gallery Filter
  const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filterValue = this.getAttribute('data-filter');

          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');

          galleryItems.forEach(item => {
              if (filterValue === 'all' || item.classList.contains(filterValue)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
          const faqItem = this.parentNode;
          faqItem.classList.toggle('active');

          faqQuestions.forEach(otherQuestion => {
              if (otherQuestion !== this && otherQuestion.parentNode.classList.contains('active')) {
                  otherQuestion.parentNode.classList.remove('active');
              }
          });
      });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonials-slider .testimonial');
  const testimonialPrevBtn = document.querySelector('.testimonial-prev');
  const testimonialNextBtn = document.querySelector('.testimonial-next');
  const testimonialDotsContainer = document.querySelector('.testimonial-dots');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      testimonials[index].classList.add('active');
      updateDots();
  }

  function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }

  function prevTestimonial() {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
  }

  function createDots() {
      testimonials.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.addEventListener('click', () => showTestimonial(index));
          testimonialDotsContainer.appendChild(dot);
      });
      updateDots();
  }

  function updateDots() {
      const dots = testimonialDotsContainer.querySelectorAll('span');
      dots.forEach((dot, index) => {
          dot.classList.remove('active');
          if (index === currentTestimonial) {
              dot.classList.add('active');
          }
      });
  }

  if (testimonials.length > 0) {
      showTestimonial(currentTestimonial);
      createDots();
      testimonialInterval = setInterval(nextTestimonial, 4000); // Change testimonial every 4 seconds

      testimonialPrevBtn.addEventListener('click', () => {
          prevTestimonial();
          clearInterval(testimonialInterval);
          testimonialInterval = setInterval(nextTestimonial, 4000);
      });

      testimonialNextBtn.addEventListener('click', () => {
          nextTestimonial();
          clearInterval(testimonialInterval);
          testimonialInterval = setInterval(nextTestimonial, 4000);
      });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });

          // Close mobile menu after clicking
          if (mainNav.classList.contains('open')) {
              mainNav.classList.remove('open');
          }
      });
  });
});