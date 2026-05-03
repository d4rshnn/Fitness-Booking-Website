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

    // close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // grab all filter pills and class cards
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.class-card');

  // remove active from all pills then set it on the clicked one
  function setActivePill(clickedPill) {
    pills.forEach(function (p) {
      p.classList.remove('active');
    });
    clickedPill.classList.add('active');
  }

  // show cards that match the filter, hide everything else
  function filterCards(filterValue) {
    cards.forEach(function (card) {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // attach click handler to each pill button
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');
      setActivePill(this);
      filterCards(filterValue);
    });
  });

});
