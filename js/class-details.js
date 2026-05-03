

document.addEventListener('DOMContentLoaded', function () {


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



  const tableRows = document.querySelectorAll('#slotsTable tbody tr');

  tableRows.forEach(function (row) {

    row.addEventListener('mouseenter', function () {
      this.style.background = '#f1f8e9'; 
    });


    row.addEventListener('mouseleave', function () {
      this.style.background = '';
    });
  });



  const bookBtn = document.getElementById('bookBtn');

  if (bookBtn) {
    bookBtn.addEventListener('click', function (e) {


      localStorage.setItem('selectedClass', 'Yoga');



    });
  }

}); 
