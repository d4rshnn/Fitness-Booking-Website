document.addEventListener('DOMContentLoaded', function () {

  // fade in hero content after a short delay
  const heroContent = document.getElementById('heroContent');
  if (heroContent) {
    setTimeout(function () {
      // adding 'loaded' triggers the css opacity and translateY transition
      heroContent.classList.add('loaded');
    }, 100);
  }

  // hamburger menu toggle for mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      // toggle nav-open class to show or hide the menu
      navLinks.classList.toggle('nav-open');
      // update aria-expanded so screen readers know the current state
      const isOpen = navLinks.classList.contains('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // close the menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // smooth scroll for any anchor link (href starts with #)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // skip if it's just a plain # with no id
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
