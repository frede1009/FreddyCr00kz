const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('active');
  burgerBtn.classList.remove('active');
  burgerBtn.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active', isOpen);
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
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

  document.addEventListener('click', function (event) {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedBurger = burgerBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger) {
      closeMenu();
    }
  });
}