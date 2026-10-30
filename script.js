const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const dishes = document.querySelectorAll('.dish');
const reservationForm = document.querySelector('#reservation-form');
const dateInput = document.querySelector('#guest-date');
const formMessage = document.querySelector('#form-message');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      mainNav.classList.remove('is-open');
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });

    dishes.forEach((dish) => {
      dish.hidden = selectedCategory !== 'all' && dish.dataset.category !== selectedCategory;
    });
  });
});

if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localToday;
}

if (reservationForm) {
  reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.classList.remove('is-error');

    if (!reservationForm.reportValidity()) {
      return;
    }

    const guestName = reservationForm.elements.name.value.trim();
    const selectedDate = new Date(`${reservationForm.elements.date.value}T00:00:00`);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(selectedDate);

    formMessage.textContent = `Thanks, ${guestName}. This demo can't send reservation requests. Please call us to book for ${formattedDate}.`;
    reservationForm.reset();
    dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  });
}

const currentYear = document.querySelector('#current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
