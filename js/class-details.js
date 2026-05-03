document.addEventListener('DOMContentLoaded', function () {

  // hamburger menu toggle for mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('nav-open');
      const isOpen = navLinks.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // highlight time slot rows on hover
  const tableRows = document.querySelectorAll('#slotsTable tbody tr');

  tableRows.forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      this.style.background = '#f1f8e9';
    });
    // reset background when the mouse leaves
    row.addEventListener('mouseleave', function () {
      this.style.background = '';
    });
  });

  // save selected class to localStorage so booking page can pre-fill the dropdown
  const bookBtn = document.getElementById('bookBtn');

  if (bookBtn) {
    bookBtn.addEventListener('click', function (e) {
      localStorage.setItem('selectedClass', 'Yoga');
    });
  }

});
