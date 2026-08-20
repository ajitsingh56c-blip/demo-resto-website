/**
 * AJIT RESTAURANT — RESERVATION ENGINE & BOOKING CONTROLLER
 * Real interactive reservation wizard, field validation, reservation IDs,
 * and .ICS calendar generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReservationWizard();
  initQuickBookingForm();
});

function initReservationWizard() {
  const wizard = document.getElementById('reservationWizard');
  if (!wizard) return;

  const stepIndicators = wizard.querySelectorAll('.step-indicator-item');
  const stepPanes = wizard.querySelectorAll('.wizard-step-pane');
  const nextBtns = wizard.querySelectorAll('.btn-wizard-next');
  const prevBtns = wizard.querySelectorAll('.btn-wizard-prev');
  const submitBtn = wizard.querySelector('.btn-wizard-submit');
  
  const guestCountEl = document.getElementById('wizardGuests');
  const guestDecBtn = document.getElementById('guestDec');
  const guestIncBtn = document.getElementById('guestInc');
  const dateInput = document.getElementById('wizardDate');
  const timeChips = wizard.querySelectorAll('.time-slot-chip');
  const seatingCards = wizard.querySelectorAll('.seating-card');

  let currentStep = 1;
  let bookingData = {
    guests: 2,
    date: '',
    time: '19:30',
    seating: 'Main Dining Hall',
    name: '',
    phone: '',
    email: '',
    occasion: 'Family Dining',
    specialRequests: ''
  };

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    bookingData.date = today;
    dateInput.addEventListener('change', (e) => {
      bookingData.date = e.target.value;
    });
  }

  if (guestCountEl && guestDecBtn && guestIncBtn) {
    guestDecBtn.onclick = () => {
      let count = parseInt(guestCountEl.textContent, 10);
      if (count > 1) {
        count--;
        guestCountEl.textContent = count;
        bookingData.guests = count;
      }
    };

    guestIncBtn.onclick = () => {
      let count = parseInt(guestCountEl.textContent, 10);
      if (count < 20) {
        count++;
        guestCountEl.textContent = count;
        bookingData.guests = count;
      }
    };
  }

  timeChips.forEach(chip => {
    chip.onclick = () => {
      timeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      bookingData.time = chip.getAttribute('data-time') || chip.textContent.trim();
    };
  });

  seatingCards.forEach(card => {
    card.onclick = () => {
      seatingCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingData.seating = card.getAttribute('data-seating') || 'Main Dining Hall';
    };
  });

  const goToStep = (stepNumber) => {
    currentStep = stepNumber;
    stepPanes.forEach(pane => {
      const paneStep = parseInt(pane.getAttribute('data-step'), 10);
      pane.classList.toggle('active', paneStep === currentStep);
    });

    stepIndicators.forEach(indicator => {
      const indStep = parseInt(indicator.getAttribute('data-step'), 10);
      indicator.classList.remove('active', 'completed');
      if (indStep === currentStep) {
        indicator.classList.add('active');
      } else if (indStep < currentStep) {
        indicator.classList.add('completed');
      }
    });

    window.scrollTo({ top: wizard.offsetTop - 100, behavior: 'smooth' });
  };

  nextBtns.forEach(btn => {
    btn.onclick = () => {
      if (currentStep === 1) {
        if (!bookingData.date) {
          window.showToast('Please select a valid dining date.', 'error');
          return;
        }
        goToStep(2);
      } else if (currentStep === 2) {
        if (!bookingData.time) {
          window.showToast('Please choose a time slot.', 'error');
          return;
        }
        goToStep(3);
      }
    };
  });

  prevBtns.forEach(btn => {
    btn.onclick = () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    };
  });

  if (submitBtn) {
    submitBtn.onclick = (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('wizardName');
      const emailInput = document.getElementById('wizardEmail');
      const phoneInput = document.getElementById('wizardPhone');
      const occasionInput = document.getElementById('wizardOccasion');
      const notesInput = document.getElementById('wizardNotes');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name) {
        window.showToast('Please enter your name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || phone.length < 7) {
        window.showToast('Please enter a valid phone number.', 'error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!email || !email.includes('@')) {
        window.showToast('Please enter a valid email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      bookingData.name = name;
      bookingData.email = email;
      bookingData.phone = phone;
      bookingData.occasion = occasionInput ? occasionInput.value : 'Family Dining';
      bookingData.specialRequests = notesInput ? notesInput.value.trim() : '';
      bookingData.id = 'AJIT-RES-' + Math.floor(10000 + Math.random() * 90000);
      bookingData.createdAt = new Date().toISOString();

      try {
        const existing = JSON.parse(localStorage.getItem('ajit_reservations') || '[]');
        existing.unshift(bookingData);
        localStorage.setItem('ajit_reservations', JSON.stringify(existing));
      } catch (err) {
        console.error(err);
      }

      showReservationConfirmation(bookingData);
    };
  }
}

function initQuickBookingForm() {
  const form = document.getElementById('quickReservationForm');
  if (!form) return;

  const dateInput = form.querySelector('#quickDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = form.querySelector('#quickName')?.value.trim();
    const phone = form.querySelector('#quickPhone')?.value.trim();
    const email = form.querySelector('#quickEmail')?.value.trim();
    const date = form.querySelector('#quickDate')?.value;
    const time = form.querySelector('#quickTime')?.value;
    const guests = form.querySelector('#quickGuests')?.value;
    const notes = form.querySelector('#quickNotes')?.value.trim();

    if (!name || !phone || !email || !date || !time || !guests) {
      window.showToast('Please complete all required fields.', 'error');
      return;
    }

    const bookingData = {
      id: 'AJIT-RES-' + Math.floor(10000 + Math.random() * 90000),
      name,
      phone,
      email,
      date,
      time,
      guests: parseInt(guests, 10),
      seating: 'Main Dining Hall',
      occasion: 'Standard Table Reservation',
      specialRequests: notes,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('ajit_reservations') || '[]');
      existing.unshift(bookingData);
      localStorage.setItem('ajit_reservations', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    form.reset();
    showReservationConfirmation(bookingData);
  };
}

function showReservationConfirmation(data) {
  let modal = document.getElementById('reservationConfirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reservationConfirmationModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-icon-success">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="sub-title">Reservation Confirmed</span>
      <h3>Table Reserved at Ajit Restaurant!</h3>
      <p style="font-size: 0.95rem; margin-bottom: 1.25rem; color: var(--text-muted);">
        Your table reservation request has been received. We look forward to welcoming you and your guests!
      </p>

      <div class="booking-summary-card">
        <div class="booking-summary-row">
          <span>Reservation ID</span>
          <strong style="color: var(--gold-primary); font-family: monospace;">${data.id}</strong>
        </div>
        <div class="booking-summary-row">
          <span>Guest Name</span>
          <strong>${data.name}</strong>
        </div>
        <div class="booking-summary-row">
          <span>Date & Time</span>
          <strong>${data.date} at ${data.time}</strong>
        </div>
        <div class="booking-summary-row">
          <span>Party Size</span>
          <strong>${data.guests} Guest${data.guests > 1 ? 's' : ''}</strong>
        </div>
        <div class="booking-summary-row">
          <span>Seating Area</span>
          <strong>${data.seating || 'Main Dining Hall'}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
        <button id="downloadIcsBtn" class="btn btn-secondary" style="font-size: 0.82rem; padding: 0.75rem 1.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Add to Calendar (.ICS)
        </button>
        <button id="closeResModalBtn" class="btn btn-primary" style="font-size: 0.82rem; padding: 0.75rem 1.5rem;">
          Done
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('#closeResModalBtn');
  const icsBtn = modal.querySelector('#downloadIcsBtn');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  if (icsBtn) {
    icsBtn.onclick = () => {
      downloadReservationICS(data);
    };
  }
}

function downloadReservationICS(booking) {
  const [hours, mins] = booking.time.split(':');
  const startDate = new Date(booking.date);
  startDate.setHours(parseInt(hours, 10), parseInt(mins || 0, 10));
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ajit Restaurant//Table Reservation//EN',
    'BEGIN:VEVENT',
    `UID:${booking.id}@ajitrestaurant.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:Dining Reservation at Ajit Restaurant (${booking.id})`,
    `DESCRIPTION:Table for ${booking.guests} guests under ${booking.name}. Seating: ${booking.seating}. Phone: +1 (212) 555-0188.`,
    'LOCATION:742 Evergreen Grand Avenue, Suite 100, New York, NY 10022',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `ajit-reservation-${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (window.showToast) window.showToast('Calendar event downloaded!', 'success');
}
