document.addEventListener('DOMContentLoaded', function () {

  // hamburger menu toggle for mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded',
        navLinks.classList.contains('nav-open'));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // helper - marks a field invalid and shows the error message
  function showError(fieldEl, errorEl, message) {
    if (fieldEl) fieldEl.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }

  // helper - clears invalid state and removes error message
  function clearError(fieldEl, errorEl) {
    if (fieldEl) fieldEl.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }

  // regex check for a basic valid email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // get form elements
  const contactForm = document.getElementById('contactForm');
  const thankyouMsg = document.getElementById('thankyouMsg');

  const cName      = document.getElementById('cName');
  const cNameError = document.getElementById('cNameError');
  const cEmail     = document.getElementById('cEmail');
  const cEmailError = document.getElementById('cEmailError');
  const cMessage   = document.getElementById('cMessage');
  const cMsgError  = document.getElementById('cMessageError');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // stop default form submission (page reload)
      e.preventDefault();

      const nameVal    = cName    ? cName.value.trim()    : '';
      const emailVal   = cEmail   ? cEmail.value.trim()   : '';
      const messageVal = cMessage ? cMessage.value.trim() : '';

      let valid = true;

      // validate name
      if (nameVal === '') {
        showError(cName, cNameError, 'Please enter your name.');
        valid = false;
      } else {
        clearError(cName, cNameError);
      }

      // validate email
      if (emailVal === '') {
        showError(cEmail, cEmailError, 'Please enter your email address.');
        valid = false;
      } else if (!isValidEmail(emailVal)) {
        showError(cEmail, cEmailError, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(cEmail, cEmailError);
      }

      // validate message - must be at least 20 characters
      if (messageVal === '') {
        showError(cMessage, cMsgError, 'Please enter a message.');
        valid = false;
      } else if (messageVal.length < 20) {
        showError(cMessage, cMsgError,
          'Message must be at least 20 characters (currently ' +
          messageVal.length + ').');
        valid = false;
      } else {
        clearError(cMessage, cMsgError);
      }

      // all valid - hide form and show thank you message
      if (valid) {
        contactForm.style.display = 'none';
        if (thankyouMsg) thankyouMsg.style.display = 'block';
      }
    });
  }

  // send another button - resets the form and shows it again
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      if (contactForm) contactForm.reset();

      // clear error messages and invalid styles
      document.querySelectorAll('.error-msg').forEach(function (el) {
        el.textContent = '';
      });
      document.querySelectorAll('.invalid').forEach(function (el) {
        el.classList.remove('invalid');
      });

      // swap back to the form
      if (thankyouMsg)  thankyouMsg.style.display  = 'none';
      if (contactForm)  contactForm.style.display  = 'block';
    });
  }

  // clear errors in real time as the user types
  if (cName)    cName.addEventListener('input',    function () { clearError(cName,    cNameError); });
  if (cEmail)   cEmail.addEventListener('input',   function () { clearError(cEmail,   cEmailError); });
  if (cMessage) cMessage.addEventListener('input', function () { clearError(cMessage, cMsgError); });

});
