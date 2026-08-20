/**
 * AJIT RESTAURANT — MENU INTERACTION & ORDERING CONTROLLER (INR ₹)
 * Real-time keyword search, category tabs, veg/non-veg filter pills,
 * and direct "Add to Order" action.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAjitMenu();
});

function initAjitMenu() {
  const grid = document.getElementById('fullMenuGrid') || document.getElementById('homepageMenuGrid');
  const searchInput = document.getElementById('menuSearchInput');
  const categoryTabs = document.querySelectorAll('.menu-tab-btn');
  const dietaryChips = document.querySelectorAll('.dietary-chip input');
  const modal = document.getElementById('dishDetailModal');

  if (!grid || typeof AJIT_MENU === 'undefined') return;

  let currentCategory = 'all';
  let searchQuery = '';
  let activeDietary = [];

  const renderDishes = () => {
    let filtered = AJIT_MENU.filter(item => {
      // 1. Category Filter
      if (currentCategory !== 'all') {
        if (currentCategory === 'mains') {
          if (item.category !== 'veg' && item.category !== 'nonveg') return false;
        } else if (item.category !== currentCategory) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesType = item.type.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesType) return false;
      }

      // 3. Dietary Pills Filter
      if (activeDietary.length > 0) {
        const passesDietary = activeDietary.every(tag => {
          if (tag === 'veg') return item.type === 'veg';
          if (tag === 'nonveg') return item.type === 'nonveg';
          if (tag === 'signature') return item.isSignature;
          if (tag === 'popular') return item.isPopular;
          return true;
        });
        if (!passesDietary) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1rem;">
          <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">No Dishes Found</h3>
          <p style="color: var(--text-muted);">Try adjusting your search terms or category filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="dish-card reveal revealed" data-id="${item.id}">
        <div class="dish-image-wrapper">
          <img src="${item.image}" alt="${item.name}" class="dish-image" loading="lazy">
          <div class="dish-badge-container">
            ${item.type === 'veg' 
              ? '<span class="badge" style="background: rgba(46, 125, 50, 0.95); color: #FFF;">🌱 Veg</span>' 
              : '<span class="badge" style="background: rgba(198, 40, 40, 0.95); color: #FFF;">🍗 Non-Veg</span>'}
            ${item.isPopular ? '<span class="badge badge-gold">⭐ Popular</span>' : ''}
          </div>
        </div>
        <div class="dish-content">
          <div class="dish-header">
            <h3 class="dish-title">${item.name}</h3>
            <span class="dish-price">₹${item.price}</span>
          </div>
          <p class="dish-desc">${item.description}</p>
          <div class="dish-footer">
            <button class="btn-text open-dish-btn" data-id="${item.id}">
              Details 
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button class="btn btn-primary add-to-order-btn" data-id="${item.id}" style="padding: 0.6rem 1.1rem; font-size: 0.78rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add ₹${item.price}
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Add to Order click
    grid.querySelectorAll('.add-to-order-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (window.cart) {
          window.cart.addItem(id);
        }
      };
    });

    // Details modal click
    grid.querySelectorAll('.open-dish-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        openDishModal(id);
      };
    });
  };

  renderDishes();

  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value.trim();
      renderDishes();
    };
  }

  categoryTabs.forEach(tab => {
    tab.onclick = () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderDishes();
    };
  });

  dietaryChips.forEach(chip => {
    chip.onchange = () => {
      const parentLabel = chip.closest('.dietary-chip');
      parentLabel.classList.toggle('active', chip.checked);

      activeDietary = Array.from(dietaryChips)
        .filter(c => c.checked)
        .map(c => c.value);

      renderDishes();
    };
  });

  const openDishModal = (dishId) => {
    const dish = AJIT_MENU.find(d => d.id === dishId);
    if (!dish || !modal) return;

    modal.querySelector('#modalDishImg').src = dish.image;
    modal.querySelector('#modalDishImg').alt = dish.name;
    modal.querySelector('#modalDishTitle').textContent = dish.name;
    modal.querySelector('#modalDishPrice').textContent = `₹${dish.price}`;
    modal.querySelector('#modalDishDesc').textContent = dish.description;
    
    const spiceEl = modal.querySelector('#modalDishSpice');
    if (spiceEl) spiceEl.textContent = dish.spiceLevel || 'Medium';

    const typeEl = modal.querySelector('#modalDishType');
    if (typeEl) typeEl.textContent = dish.type === 'veg' ? 'Pure Vegetarian (🌱)' : 'Non-Vegetarian (🍗)';

    const modalAddBtn = modal.querySelector('#modalAddOrderBtn');
    if (modalAddBtn) {
      modalAddBtn.textContent = `🛒 Add to Order (₹${dish.price})`;
      modalAddBtn.onclick = () => {
        if (window.cart) {
          window.cart.addItem(dish.id);
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (modal) {
    const closeBtn = modal.querySelector('.modal-close-btn');
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }
}
