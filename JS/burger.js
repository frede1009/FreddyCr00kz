/* ------------------------------
   BURGER MENU BEHAVIOUR
   Controls the mobile navigation toggle, nested dropdowns, and close-on-click logic.
   ------------------------------ */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

function closeDropdowns() {
  const dropdowns = navMenu.querySelectorAll('.nav-dropdown');
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove('open');
    const button = dropdown.querySelector('.nav-dropdown-toggle');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

function closeMenu() {
  navMenu.classList.remove('active');
  burgerBtn.classList.remove('active');
  burgerBtn.setAttribute('aria-expanded', 'false');
  closeDropdowns();
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active', isOpen);
  burgerBtn.setAttribute('aria-expanded', String(isOpen));

  if (!isOpen) {
    closeDropdowns();
  }
}

if (burgerBtn && navMenu) {
  burgerBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleMenu();
  });

  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  const dropdownButtons = navMenu.querySelectorAll('.nav-dropdown-toggle');
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      const parent = button.closest('.nav-dropdown');
      const isOpen = parent.classList.contains('open');

      closeDropdowns();

      if (!isOpen) {
        parent.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (event) {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedBurger = burgerBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger) {
      closeMenu();
    }
  });
}