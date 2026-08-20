/**
 * AJIT RESTAURANT — SIMULATED DEMO PAYMENT GATEWAY
 * Simulates UPI (success@demo / failure@demo), Cards, Net Banking, Wallets & COD
 * Currency: INR (₹) | Test Mode Only | No real financial transactions
 */

class AjitPaymentGateway {
  constructor() {
    this.currentOrder = null;
    this.selectedMethod = 'upi'; // 'upi', 'card', 'netbanking', 'wallet', 'cod'
    this.selectedBank = 'State Bank of India';
    this.selectedWallet = 'DemoPay Wallet';
    this.initModalDOM();
  }

  initModalDOM() {
    let modal = document.getElementById('paymentGatewayModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'paymentGatewayModal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }
  }

  open(order) {
    this.currentOrder = order;
    this.selectedMethod = 'upi';
    this.render();

    const modal = document.getElementById('paymentGatewayModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    const modal = document.getElementById('paymentGatewayModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  render() {
    const modal = document.getElementById('paymentGatewayModal');
    if (!modal || !this.currentOrder) return;

    const total = this.currentOrder.calcs.total;

    modal.innerHTML = `
      <div class="modal-box checkout-modal-box" style="max-width: 650px;">
        <button id="closeGatewayBtn" style="position: absolute; top: 1.25rem; right: 1.25rem; font-size: 1.5rem; color: var(--text-muted); cursor: pointer;">&times;</button>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span class="sub-title no-after" style="margin-bottom: 0;">Ajit Restaurant Checkout</span>
          <div class="demo-mode-badge" style="margin-bottom: 0;">🟡 TEST / DEMO PAYMENT MODE</div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
          <div>
            <h3 style="font-size: 1.5rem; color: #FFFFFF; margin: 0;">Complete Payment</h3>
            <span style="font-size: 0.85rem; color: var(--text-muted);">Paying for Order (${this.currentOrder.items.length} dishes)</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Total Payable</span>
            <strong style="font-size: 1.5rem; color: var(--gold-primary);">₹${total}</strong>
          </div>
        </div>

        <!-- Payment Method Tabs -->
        <div class="payment-tabs-grid">
          <button class="payment-tab-btn ${this.selectedMethod === 'upi' ? 'active' : ''}" data-method="upi">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            UPI / QR
          </button>
          <button class="payment-tab-btn ${this.selectedMethod === 'card' ? 'active' : ''}" data-method="card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            Debit/Credit Card
          </button>
          <button class="payment-tab-btn ${this.selectedMethod === 'netbanking' ? 'active' : ''}" data-method="netbanking">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"></path></svg>
            Net Banking
          </button>
          <button class="payment-tab-btn ${this.selectedMethod === 'wallet' ? 'active' : ''}" data-method="wallet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><circle cx="18" cy="14" r="2"></circle></svg>
            Wallets
          </button>
          <button class="payment-tab-btn ${this.selectedMethod === 'cod' ? 'active' : ''}" data-method="cod">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
            Cash on Delivery
          </button>
        </div>

        <!-- Tab 1: UPI -->
        <div class="payment-pane ${this.selectedMethod === 'upi' ? 'active' : ''}" id="pane-upi">
          <div class="demo-hint-box">
            💡 <strong>Test Mode Hint:</strong><br>
            • Type <code>success@demo</code> to test <strong>Successful Payment</strong>.<br>
            • Type <code>failure@demo</code> to test <strong>Simulated Failure</strong>.
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Enter UPI ID / VPA</label>
              <input type="text" id="inputUpiId" class="form-control" placeholder="e.g. success@demo" value="success@demo">
            </div>

            <div class="upi-qr-box">
              <span style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Or Scan Demo QR Code</span>
              <div class="upi-qr-placeholder">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="#121316">
                  <path d="M2 2h8v8H2zm2 2v4h4V4zm10-2h8v8h-8zm2 2v4h4V4zM2 14h8v8H2zm2 2v4h4v-4zm10 0h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm2-2h2v2h-2zm-6-2h2v2h-2z"></path>
                </svg>
              </div>
              <span style="font-size: 0.75rem; color: var(--gold-light);">BHIM / Google Pay / PhonePe / Paytm Supported</span>
            </div>

            <button id="btnPayUpi" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 0.95rem;">
              Pay ₹${total} via UPI
            </button>
          </div>
        </div>

        <!-- Tab 2: Cards -->
        <div class="payment-pane ${this.selectedMethod === 'card' ? 'active' : ''}" id="pane-card">
          <div class="demo-hint-box">
            💡 <strong>Test Card:</strong> <code>4111 1111 1111 1111</code> | Any future expiry | Any CVV
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Card Number</label>
              <input type="text" id="inputCardNumber" class="form-control" placeholder="4111 1111 1111 1111" value="4111 1111 1111 1111" maxlength="19">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Expiry (MM/YY)</label>
                <input type="text" id="inputCardExpiry" class="form-control" placeholder="12/28" value="12/28" maxlength="5">
              </div>
              <div class="form-group">
                <label class="form-label">CVV</label>
                <input type="password" id="inputCardCvv" class="form-control" placeholder="123" value="123" maxlength="3">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cardholder Name</label>
              <input type="text" id="inputCardName" class="form-control" placeholder="Cardholder Name" value="${this.currentOrder.name || 'Demo User'}">
            </div>

            <button id="btnPayCard" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 0.95rem;">
              Pay ₹${total} securely
            </button>
          </div>
        </div>

        <!-- Tab 3: Net Banking -->
        <div class="payment-pane ${this.selectedMethod === 'netbanking' ? 'active' : ''}" id="pane-netbanking">
          <label class="form-label">Select Your Bank</label>
          <div class="banks-select-grid">
            <div class="bank-option-chip ${this.selectedBank === 'State Bank of India' ? 'selected' : ''}" data-bank="State Bank of India">SBI</div>
            <div class="bank-option-chip ${this.selectedBank === 'HDFC Bank' ? 'selected' : ''}" data-bank="HDFC Bank">HDFC Bank</div>
            <div class="bank-option-chip ${this.selectedBank === 'ICICI Bank' ? 'selected' : ''}" data-bank="ICICI Bank">ICICI Bank</div>
            <div class="bank-option-chip ${this.selectedBank === 'Axis Bank' ? 'selected' : ''}" data-bank="Axis Bank">Axis Bank</div>
            <div class="bank-option-chip ${this.selectedBank === 'Punjab National Bank' ? 'selected' : ''}" data-bank="Punjab National Bank">PNB</div>
            <div class="bank-option-chip ${this.selectedBank === 'Kotak Mahindra Bank' ? 'selected' : ''}" data-bank="Kotak Mahindra Bank">Kotak Bank</div>
            <div class="bank-option-chip ${this.selectedBank === 'Bank of Baroda' ? 'selected' : ''}" data-bank="Bank of Baroda">Bank of Baroda</div>
          </div>

          <button id="btnPayNetbanking" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 0.95rem; margin-top: 1rem;">
            Proceed to Bank Verification (₹${total})
          </button>
        </div>

        <!-- Tab 4: Wallets -->
        <div class="payment-pane ${this.selectedMethod === 'wallet' ? 'active' : ''}" id="pane-wallet">
          <label class="form-label">Choose Wallet</label>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <label class="dietary-chip ${this.selectedWallet === 'DemoPay Wallet' ? 'active' : ''}" style="border-radius: var(--radius-sm); padding: 0.85rem 1rem; width: 100%;">
              <input type="radio" name="demoWalletChoice" value="DemoPay Wallet" checked>
              <span>💳 DemoPay Balance (₹5,000 Available)</span>
            </label>
            <label class="dietary-chip ${this.selectedWallet === 'Paytm Demo Wallet' ? 'active' : ''}" style="border-radius: var(--radius-sm); padding: 0.85rem 1rem; width: 100%;">
              <input type="radio" name="demoWalletChoice" value="Paytm Demo Wallet">
              <span>🔵 Paytm Demo Wallet</span>
            </label>
            <label class="dietary-chip ${this.selectedWallet === 'PhonePe Demo Wallet' ? 'active' : ''}" style="border-radius: var(--radius-sm); padding: 0.85rem 1rem; width: 100%;">
              <input type="radio" name="demoWalletChoice" value="PhonePe Demo Wallet">
              <span>🟣 PhonePe Demo Wallet</span>
            </label>
          </div>

          <button id="btnPayWallet" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 0.95rem;">
            Pay ₹${total} with Wallet
          </button>
        </div>

        <!-- Tab 5: Cash on Delivery (COD) -->
        <div class="payment-pane ${this.selectedMethod === 'cod' ? 'active' : ''}" id="pane-cod">
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💵</div>
            <h4 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 0.25rem;">Cash / UPI on Delivery</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Pay cash or scan rider's QR code when your delicious order arrives at your doorstep.
            </p>
          </div>

          <button id="btnPayCod" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 0.95rem;">
            Confirm Order with Cash on Delivery (₹${total})
          </button>
        </div>

      </div>
    `;

    // Tab switcher handlers
    modal.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.selectedMethod = btn.getAttribute('data-method');
        this.render();
      };
    });

    // Close button handler
    const closeBtn = modal.querySelector('#closeGatewayBtn');
    if (closeBtn) closeBtn.onclick = () => this.close();

    // Bank Chips
    modal.querySelectorAll('.bank-option-chip').forEach(chip => {
      chip.onclick = () => {
        modal.querySelectorAll('.bank-option-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        this.selectedBank = chip.getAttribute('data-bank');
      };
    });

    // Wallet Radios
    modal.querySelectorAll('input[name="demoWalletChoice"]').forEach(radio => {
      radio.onchange = () => {
        this.selectedWallet = radio.value;
      };
    });

    // Button Actions
    const btnPayUpi = modal.querySelector('#btnPayUpi');
    if (btnPayUpi) {
      btnPayUpi.onclick = () => {
        const upiId = modal.querySelector('#inputUpiId').value.trim();
        const willSucceed = upiId !== 'failure@demo';
        this.processPayment('UPI (' + upiId + ')', willSucceed);
      };
    }

    const btnPayCard = modal.querySelector('#btnPayCard');
    if (btnPayCard) {
      btnPayCard.onclick = () => {
        const cardNum = modal.querySelector('#inputCardNumber').value.trim();
        const willSucceed = !cardNum.includes('0000');
        this.processPayment('Debit/Credit Card (•••• 1111)', willSucceed);
      };
    }

    const btnPayNetbanking = modal.querySelector('#btnPayNetbanking');
    if (btnPayNetbanking) {
      btnPayNetbanking.onclick = () => {
        this.processPayment('Net Banking (' + this.selectedBank + ')', true);
      };
    }

    const btnPayWallet = modal.querySelector('#btnPayWallet');
    if (btnPayWallet) {
      btnPayWallet.onclick = () => {
        this.processPayment('Wallet (' + this.selectedWallet + ')', true);
      };
    }

    const btnPayCod = modal.querySelector('#btnPayCod');
    if (btnPayCod) {
      btnPayCod.onclick = () => {
        this.processPayment('Cash on Delivery (COD)', true, true);
      };
    }
  }

  processPayment(methodName, shouldSucceed = true, isCod = false) {
    const modal = document.getElementById('paymentGatewayModal');
    if (!modal) return;

    // Show 1.5s Processing Animation
    modal.innerHTML = `
      <div class="modal-box payment-processing-overlay" style="max-width: 500px;">
        <div class="payment-spinner"></div>
        <div class="demo-mode-badge">🟡 TEST / DEMO TRANSACTION</div>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: #FFFFFF;">Processing Demo Payment...</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted);">
          Simulating secure bank authorization for <strong>₹${this.currentOrder.calcs.total}</strong> via ${methodName}.
        </p>
      </div>
    `;

    setTimeout(() => {
      if (shouldSucceed) {
        this.handleSuccess(methodName, isCod);
      } else {
        this.handleFailure(methodName);
      }
    }, 1600);
  }

  handleSuccess(methodName, isCod = false) {
    const orderId = 'AJT-2026-' + Math.floor(10000 + Math.random() * 90000);
    const paymentId = isCod ? 'COD-PENDING' : 'DEMO-PAY-' + Math.floor(100000 + Math.random() * 900000);
    
    const completedOrder = {
      ...this.currentOrder,
      orderId,
      paymentId,
      paymentMethod: methodName,
      paymentStatus: isCod ? 'Pending (COD)' : 'Successful (Demo Paid)',
      statusTimeline: [
        { label: 'Order Received', time: 'Just now', completed: true },
        { label: 'Payment Confirmed', time: isCod ? 'On Delivery' : 'Verified', completed: true },
        { label: 'Preparing in Kitchen', time: 'In Progress (Tandoor)', current: true },
        { label: 'Out for Delivery', time: 'Estimated 25 mins', completed: false },
        { label: 'Delivered', time: 'Estimated 35 mins', completed: false }
      ],
      completedAt: new Date().toISOString()
    };

    // Save to orders history
    try {
      const orders = JSON.parse(localStorage.getItem('ajit_orders_history') || '[]');
      orders.unshift(completedOrder);
      localStorage.setItem('ajit_orders_history', JSON.stringify(orders));
      localStorage.setItem('ajit_active_order', JSON.stringify(completedOrder));
    } catch (e) {
      console.error(e);
    }

    // Clear cart
    if (window.cart) {
      window.cart.clearCart();
    }

    // Render Success Modal
    const modal = document.getElementById('paymentGatewayModal');
    if (modal) {
      modal.innerHTML = `
        <div class="modal-box" style="max-width: 540px; text-align: center;">
          <div class="payment-status-icon success">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="demo-mode-badge">🟡 DEMO TRANSACTION SUCCESS</div>
          <h3 style="font-size: 1.75rem; margin-bottom: 0.25rem;">Payment Successful!</h3>
          <p style="font-size: 0.95rem; color: var(--gold-light); margin-bottom: 1.5rem;">
            Order Confirmed! Your tandoor feast is being prepared.
          </p>

          <div class="booking-summary-card" style="text-align: left; margin-bottom: 1.5rem;">
            <div class="booking-summary-row">
              <span>Order Number</span>
              <strong style="color: var(--gold-primary); font-family: monospace;">${orderId}</strong>
            </div>
            <div class="booking-summary-row">
              <span>Payment ID</span>
              <strong style="font-family: monospace;">${paymentId}</strong>
            </div>
            <div class="booking-summary-row">
              <span>Amount Paid</span>
              <strong style="color: var(--gold-primary); font-size: 1.15rem;">₹${completedOrder.calcs.total}</strong>
            </div>
            <div class="booking-summary-row">
              <span>Payment Method</span>
              <strong>${methodName}</strong>
            </div>
            <div class="booking-summary-row">
              <span>Delivery To</span>
              <span>${completedOrder.address}</span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="track.html?orderId=${orderId}" class="btn btn-primary" style="flex: 1; padding: 0.9rem;">
              🚀 Track Order Live
            </a>
            <a href="index.html" class="btn btn-secondary" style="flex: 1; padding: 0.9rem;">
              Back to Home
            </a>
          </div>
        </div>
      `;
    }
  }

  handleFailure(methodName) {
    const modal = document.getElementById('paymentGatewayModal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-box" style="max-width: 500px; text-align: center;">
        <div class="payment-status-icon failed">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="demo-mode-badge">🟡 DEMO PAYMENT TEST</div>
        <h3 style="font-size: 1.65rem; margin-bottom: 0.25rem; color: #FF6B6B;">Payment Failed</h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          The simulated demo payment could not be completed via ${methodName}. No money was charged.
        </p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button id="btnRetryPayment" class="btn btn-primary" style="flex: 1; padding: 0.9rem;">
            🔄 Try Again (success@demo)
          </button>
          <button id="btnChangePayment" class="btn btn-secondary" style="flex: 1; padding: 0.9rem;">
            Change Method
          </button>
        </div>
      </div>
    `;

    const btnRetry = modal.querySelector('#btnRetryPayment');
    const btnChange = modal.querySelector('#btnChangePayment');

    if (btnRetry) {
      btnRetry.onclick = () => {
        this.processPayment('UPI (success@demo)', true);
      };
    }

    if (btnChange) {
      btnChange.onclick = () => {
        this.render();
      };
    }
  }
}

// Global instance
window.paymentGateway = new AjitPaymentGateway();
