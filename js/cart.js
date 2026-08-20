/**
 * AJIT RESTAURANT — CART & FOOD ORDERING SYSTEM (INR ₹ + 5% GST)
 * Real-time calculation: Subtotal, 5% GST, ₹40 Delivery Fee (FREE above ₹499),
 * and direct launch of the Simulated Payment Gateway.
 */

class AjitCart {
  constructor() {
    this.items = [];
    this.orderType = 'delivery'; // 'delivery' or 'pickup'
    this.loadFromStorage();
    this.initDOM();
    this.updateUI();
  }

  get config() {
    return window.AJIT_CONFIG || {
      currency: "₹",
      gstRate: 0.05,
      deliveryFee: 40,
      freeDeliveryThreshold: 499
    };
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('ajit_cart_items');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (e) {
      this.items = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('ajit_cart_items', JSON.stringify(this.items));
    } catch (e) {
      console.error(e);
    }
  }

  addItem(dishId) {
    if (!window.AJIT_MENU) return;
    const dish = window.AJIT_MENU.find(d => d.id === dishId);
    if (!dish) return;

    const existing = this.items.find(i => i.id === dishId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        type: dish.type,
        quantity: 1
      });
    }

    this.saveToStorage();
    this.updateUI();

    if (window.showToast) {
      window.showToast(`Added "${dish.name}" (₹${dish.price}) to order!`, 'success');
    }

    this.openDrawer();
  }

  updateQuantity(dishId, delta) {
    const item = this.items.find(i => i.id === dishId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(dishId);
      return;
    }

    this.saveToStorage();
    this.updateUI();
  }

  removeItem(dishId) {
    this.items = this.items.filter(i => i.id !== dishId);
    this.saveToStorage();
    this.updateUI();
    if (window.showToast) {
      window.showToast('Item removed from order.', 'info');
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.updateUI();
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCalculations() {
    const cfg = this.config;
    const subtotal = this.getSubtotal();
    const actualDelivery = (this.orderType === 'pickup' || subtotal >= cfg.freeDeliveryThreshold || subtotal === 0) 
      ? 0 
      : cfg.deliveryFee;
    const gst = Math.round(subtotal * cfg.gstRate);
    const total = subtotal + actualDelivery + gst;

    return {
      subtotal: subtotal,
      delivery: actualDelivery,
      gst: gst,
      total: total,
      isFreeDelivery: subtotal >= cfg.freeDeliveryThreshold && this.orderType === 'delivery'
    };
  }

  initDOM() {
    let overlay = document.getElementById('cartDrawerOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cartDrawerOverlay';
      overlay.className = 'cart-drawer-overlay';
      overlay.innerHTML = `
        <div id="cartDrawer" class="cart-drawer">
          <div class="cart-header">
            <h3>Your Order (<span id="cartHeaderCount">0</span>)</h3>
            <button id="closeCartBtn" class="cart-close-btn" aria-label="Close cart">&times;</button>
          </div>
          <div class="cart-body" id="cartItemsContainer"></div>
          <div class="cart-footer" id="cartFooter"></div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    document.querySelectorAll('.nav-cart-btn, .open-cart-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.openDrawer();
      };
    });

    const closeBtn = document.getElementById('closeCartBtn');
    if (closeBtn) closeBtn.onclick = () => this.closeDrawer();
    overlay.onclick = (e) => {
      if (e.target === overlay) this.closeDrawer();
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  updateUI() {
    const count = this.getTotalCount();
    
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    const headerCount = document.getElementById('cartHeaderCount');
    if (headerCount) headerCount.textContent = count;

    const container = document.getElementById('cartItemsContainer');
    const footer = document.getElementById('cartFooter');

    if (!container || !footer) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h4 style="color: #FFFFFF; font-size: 1.15rem; margin-bottom: 0.5rem;">Your order is empty</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">Add delicious paneer, biryani, or butter chicken from our food menu.</p>
          <a href="menu.html" class="btn btn-primary" style="font-size: 0.82rem; padding: 0.75rem 1.5rem;">Browse Menu</a>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-item-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="cart-item-name">${item.name}</div>
            <button class="cart-item-remove" data-id="${item.id}" title="Remove Item">&times;</button>
          </div>
          <div class="cart-item-price">₹${item.price * item.quantity}</div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn btn-qty-dec" data-id="${item.id}">&minus;</button>
            <span class="cart-qty-num">${item.quantity}</span>
            <button class="cart-qty-btn btn-qty-inc" data-id="${item.id}">&plus;</button>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-qty-dec').forEach(b => {
      b.onclick = () => this.updateQuantity(b.getAttribute('data-id'), -1);
    });
    container.querySelectorAll('.btn-qty-inc').forEach(b => {
      b.onclick = () => this.updateQuantity(b.getAttribute('data-id'), 1);
    });
    container.querySelectorAll('.cart-item-remove').forEach(b => {
      b.onclick = () => this.removeItem(b.getAttribute('data-id'));
    });

    const calcs = this.getCalculations();
    footer.innerHTML = `
      <div class="order-type-toggle">
        <div class="order-type-btn ${this.orderType === 'delivery' ? 'active' : ''}" id="btnOrderDelivery">🛵 Delivery</div>
        <div class="order-type-btn ${this.orderType === 'pickup' ? 'active' : ''}" id="btnOrderPickup">🛍️ Self Pickup</div>
      </div>
      <div class="cart-summary-line">
        <span>Subtotal</span>
        <span>₹${calcs.subtotal}</span>
      </div>
      <div class="cart-summary-line">
        <span>GST (5%)</span>
        <span>₹${calcs.gst}</span>
      </div>
      <div class="cart-summary-line">
        <span>${this.orderType === 'delivery' ? 'Delivery Fee' : 'Store Pickup'}</span>
        <span>${calcs.delivery === 0 ? '<strong style="color: var(--gold-light);">FREE</strong>' : `₹${calcs.delivery}`}</span>
      </div>
      <div class="cart-summary-line total-line">
        <span>Grand Total</span>
        <span>₹${calcs.total}</span>
      </div>
      <button id="btnProceedCheckout" class="btn btn-primary cart-checkout-btn">
        Proceed to Checkout (₹${calcs.total})
      </button>
    `;

    const btnDel = document.getElementById('btnOrderDelivery');
    const btnPic = document.getElementById('btnOrderPickup');
    if (btnDel) {
      btnDel.onclick = () => {
        this.orderType = 'delivery';
        this.updateUI();
      };
    }
    if (btnPic) {
      btnPic.onclick = () => {
        this.orderType = 'pickup';
        this.updateUI();
      };
    }

    const btnCheckout = document.getElementById('btnProceedCheckout');
    if (btnCheckout) {
      btnCheckout.onclick = () => {
        this.closeDrawer();
        this.openDetailsModal();
      };
    }
  }

  openDetailsModal() {
    let modal = document.getElementById('checkoutModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'checkoutModal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const calcs = this.getCalculations();

    modal.innerHTML = `
      <div class="modal-box checkout-modal-box">
        <button id="closeCheckoutBtn" style="position: absolute; top: 1.25rem; right: 1.25rem; font-size: 1.5rem; color: var(--text-muted); cursor: pointer;">&times;</button>
        <span class="sub-title no-after">Step 1 of 2</span>
        <h3 style="margin-bottom: 1.25rem;">Delivery & Contact Details</h3>

        <form id="checkoutDetailsForm">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="chkName" class="form-control" placeholder="e.g. Vikram Singhania" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Phone Number *</label>
                <input type="tel" id="chkPhone" class="form-control" placeholder="+91 98765 43210" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" id="chkEmail" class="form-control" placeholder="vikram@domain.com" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${this.orderType === 'delivery' ? 'Delivery Address *' : 'Pickup Confirmation Note'}</label>
              <input type="text" id="chkAddress" class="form-control" placeholder="${this.orderType === 'delivery' ? 'Flat / House No, Street, Landmark, Gurugram / Delhi' : 'Self Pickup at Cyber Hub Outlet'}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Special Cooking / Delivery Instructions</label>
              <input type="text" id="chkInstructions" class="form-control" placeholder="Extra spicy, please send extra green chutney...">
            </div>

            <div class="booking-summary-card" style="margin: 0.5rem 0;">
              <div class="booking-summary-row">
                <span>Items (${this.getTotalCount()})</span>
                <strong>₹${calcs.subtotal}</strong>
              </div>
              <div class="booking-summary-row">
                <span>5% GST</span>
                <span>₹${calcs.gst}</span>
              </div>
              <div class="booking-summary-row">
                <span>Delivery Mode</span>
                <strong>${this.orderType === 'delivery' ? (calcs.delivery === 0 ? '🛵 Free Delivery' : '🛵 ₹40 Delivery') : '🛍️ Self Pickup (Free)'}</strong>
              </div>
              <div class="booking-summary-row">
                <span>Final Payable Amount</span>
                <strong style="color: var(--gold-primary); font-size: 1.15rem;">₹${calcs.total}</strong>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.1rem; font-size: 0.95rem;">
              Proceed to Demo Payment (₹${calcs.total}) &rarr;
            </button>
            <p style="font-size: 0.78rem; text-align: center; color: var(--gold-light);">
              🟡 Demo Mode — Supports simulated UPI, Cards, Net Banking & COD
            </p>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('#closeCheckoutBtn');
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    const form = modal.querySelector('#checkoutDetailsForm');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = form.querySelector('#chkName').value.trim();
        const phone = form.querySelector('#chkPhone').value.trim();
        const email = form.querySelector('#chkEmail').value.trim();
        const address = form.querySelector('#chkAddress').value.trim();
        const instructions = form.querySelector('#chkInstructions').value.trim();

        if (!name || !phone || !email || !address) {
          if (window.showToast) window.showToast('Please fill out all required fields.', 'error');
          return;
        }

        const orderPayload = {
          name,
          phone,
          email,
          address,
          instructions,
          items: [...this.items],
          calcs,
          orderType: this.orderType,
          createdAt: new Date().toISOString()
        };

        closeModal();

        // Launch the Simulated Payment Gateway
        if (window.paymentGateway) {
          window.paymentGateway.open(orderPayload);
        }
      };
    }
  }
}

window.cart = new AjitCart();
