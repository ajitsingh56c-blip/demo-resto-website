/**
 * AJIT RESTAURANT — OPENING INTRO ANIMATION CONTROLLER
 * Delivers a cinematic brand opening on initial website visit.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBrandIntro();
});

function initBrandIntro() {
  const introEl = document.getElementById('brandIntroOverlay');
  if (!introEl) return;

  const hasSeenIntro = sessionStorage.getItem('ajit_intro_viewed');

  // If already viewed in this session, skip immediately
  if (hasSeenIntro) {
    introEl.remove();
    return;
  }

  const skipBtn = introEl.querySelector('.intro-skip-btn');

  const closeIntro = () => {
    sessionStorage.setItem('ajit_intro_viewed', 'true');
    introEl.classList.add('fade-out');
    setTimeout(() => {
      if (introEl.parentNode) {
        introEl.remove();
      }
    }, 850);
  };

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeIntro();
    });
  }

  // Click on background or Esc key skips
  introEl.addEventListener('click', closeIntro);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      if (!introEl.classList.contains('fade-out')) {
        closeIntro();
      }
    }
  }, { once: true });

  // Auto transition after 3.2 seconds
  setTimeout(() => {
    if (!introEl.classList.contains('fade-out')) {
      closeIntro();
    }
  }, 3200);
}
