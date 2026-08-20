/**
 * AJIT RESTAURANT — CORE APPLICATION JAVASCRIPT
 * Header sticky scroll, mobile drawer, scroll animations, reviews carousel,
 * gallery lightbox, and contact forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initGalleryLightbox();
  initReviewsCarousel();
  initFAQAccordions();
  initContactForm();
  initNewsletterForm();
  highlightActiveNavLink();
});

/* --------------------------------------------------------------------------
   1. Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (overlay) overlay.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Nav Link Highlighter
   -------------------------------------------------------------------------- */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Scroll Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Reviews Carousel
   -------------------------------------------------------------------------- */
function initReviewsCarousel() {
  const container = document.getElementById('reviewsCarouselContainer');
  if (!container || typeof AJIT_REVIEWS === 'undefined') return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  const renderCarousel = () => {
    container.innerHTML = `
      <div class="reviews-slider-track" id="reviewsTrack">
        ${AJIT_REVIEWS.map((rev, idx) => `
          <div class="review-card ${idx === currentIndex ? 'active-slide' : ''}" style="display: ${idx === currentIndex ? 'flex' : 'none'};">
            <div>
              <div class="review-stars">★★★★★</div>
              <p class="review-quote">"${rev.quote}"</p>
            </div>
            <div class="reviewer-meta">
              <img src="${rev.avatar}" alt="${rev.name}" class="reviewer-avatar">
              <div class="reviewer-info">
                <h5>${rev.name}</h5>
                <span>Verified Diner • ${rev.tag}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="reviews-controls" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 2rem;">
        <button id="prevReviewBtn" class="social-btn" aria-label="Previous review">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <div class="carousel-dots" style="display: flex; gap: 0.5rem;">
          ${AJIT_REVIEWS.map((_, i) => `
            <span class="carousel-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" style="width: 10px; height: 10px; border-radius: 50%; background: ${i === currentIndex ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)'}; cursor: pointer; transition: all 0.3s ease;"></span>
          `).join('')}
        </div>

        <button id="nextReviewBtn" class="social-btn" aria-label="Next review">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `;

    const prevBtn = container.querySelector('#prevReviewBtn');
    const nextBtn = container.querySelector('#nextReviewBtn');
    const dots = container.querySelectorAll('.carousel-dot');

    if (prevBtn) prevBtn.onclick = () => { goToSlide(currentIndex - 1); resetAutoSlide(); };
    if (nextBtn) nextBtn.onclick = () => { goToSlide(currentIndex + 1); resetAutoSlide(); };
    dots.forEach(d => {
      d.onclick = () => {
        const idx = parseInt(d.getAttribute('data-index'), 10);
        goToSlide(idx);
        resetAutoSlide();
      };
    });
  };

  const goToSlide = (idx) => {
    if (idx < 0) idx = AJIT_REVIEWS.length - 1;
    if (idx >= AJIT_REVIEWS.length) idx = 0;
    currentIndex = idx;
    renderCarousel();
  };

  const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5500);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  };

  renderCarousel();
  startAutoSlide();

  container.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
  container.addEventListener('mouseleave', () => startAutoSlide());
}

/* --------------------------------------------------------------------------
   6. Interactive Gallery & Lightbox
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterBtns = document.querySelectorAll('.gallery-filter-nav .filter-btn');
  const lightbox = document.getElementById('galleryLightbox');

  if (!galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCategory = lightbox.querySelector('.lightbox-cat');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let activeItems = [...galleryItems];

  const updateActive = () => {
    activeItems = galleryItems.filter(i => i.style.display !== 'none');
  };

  const showImage = (index) => {
    updateActive();
    if (!activeItems.length) return;
    if (index < 0) index = activeItems.length - 1;
    if (index >= activeItems.length) index = 0;
    currentIndex = index;

    const item = activeItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-caption h4')?.textContent || '';
    const cat = item.querySelector('.gallery-caption span')?.textContent || '';

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = cat;
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateActive();
      currentIndex = activeItems.indexOf(item);
      showImage(currentIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); showImage(currentIndex - 1); };
  if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); showImage(currentIndex + 1); };
  lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   7. Contact & FAQ Accordion
   -------------------------------------------------------------------------- */
function initFAQAccordions() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(other => { if (other !== item) other.classList.remove('active'); });
      item.classList.toggle('active', !isActive);
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#contactName')?.value.trim();
    const email = form.querySelector('#contactEmail')?.value.trim();
    const message = form.querySelector('#contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    showToast('Your message has been sent to Ajit Restaurant concierge! We will respond promptly.', 'success');
    form.reset();
  });
}

function initNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Thank you for subscribing to Ajit Restaurant updates!', 'success');
        input.value = '';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Global Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconSvg = type === 'success' 
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A059" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}

window.showToast = showToast;
