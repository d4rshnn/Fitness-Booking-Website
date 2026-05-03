/* =============================================
   classes.js — Classes Page JavaScript
   FitLife Studio
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------
     1. HAMBURGER MENU TOGGLE
  -------------------------------------------------- */
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





  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.class-card');


  function setActivePill(clickedPill) {
    pills.forEach(function (p) {
      p.classList.remove('active');
    });
    clickedPill.classList.add('active');
  }


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


  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');


      setActivePill(this);


      filterCards(filterValue);
    });
  });

}); 
