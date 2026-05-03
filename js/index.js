
document.addEventListener('DOMContentLoaded', function () {


  const heroContent = document.getElementById('heroContent');
  if (heroContent) {

    setTimeout(function () {
      heroContent.classList.add('loaded');
    }, 100);
  }


  
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


 
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); 
