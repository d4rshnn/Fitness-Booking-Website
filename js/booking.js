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

  // pre-fill class dropdown from localStorage if user came from class-details page
  const selectClass = document.getElementById('selectClass');

  if (selectClass) {
    const saved = localStorage.getItem('selectedClass');
    if (saved) {
      // loop through dropdown options to find the matching one
      for (let i = 0; i < selectClass.options.length; i++) {
        if (selectClass.options[i].value === saved) {
          selectClass.selectedIndex = i;
          break;
        }
      }
    }
  }

  // elements for the live booking summary box
  const sumClass = document.getElementById('sumClass');
  const sumSlot  = document.getElementById('sumSlot');
  const sumDays  = document.getElementById('sumDays');
  const sumCombo = document.getElementById('sumCombo');

  const selectSlot    = document.getElementById('selectSlot');
  const comboPlan     = document.getElementById('comboPlan');
  const dayCheckboxes = document.querySelectorAll('input[name="days"]');

  // returns comma-separated checked days, or 'None chosen' if none are ticked
  function getSelectedDays() {
    const selected = [];
    dayCheckboxes.forEach(function (cb) {
      if (cb.checked) selected.push(cb.value);
    });
    return selected.length > 0 ? selected.join(', ') : 'None chosen';
  }

  // updates all four rows of the summary box
  function updateSummary() {
    if (sumClass) sumClass.textContent = selectClass.value || 'Not selected';
    if (sumSlot)  sumSlot.textContent  = selectSlot.value  || 'Not selected';
    if (sumDays)  sumDays.textContent  = getSelectedDays();
    if (sumCombo) sumCombo.textContent = comboPlan.value   || 'None';
  }

  // re-run summary whenever any input changes
  if (selectClass) selectClass.addEventListener('change', updateSummary);
  if (selectSlot)  selectSlot.addEventListener('change', updateSummary);
  if (comboPlan)   comboPlan.addEventListener('change', updateSummary);

  dayCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', updateSummary);
  });

  // run once on load in case class was pre-filled from localStorage
  updateSummary();

  // helper - marks a field invalid and shows the error text below it
  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('invalid');
    if (error) error.textContent = message;
  }

  // helper - removes invalid styling and clears error text
  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('invalid');
    if (error) error.textContent = '';
  }

  // regex check for a valid email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // checks phone is exactly 10 digits
  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  const bookingForm = document.getElementById('bookingForm');
  const formCard    = document.getElementById('formCard');
  const successCard = document.getElementById('successCard');
  const successMsg  = document.getElementById('successMsg');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      // stop the form from reloading the page
      e.preventDefault();

      // collect all field values
      const nameVal  = document.getElementById('userName').value.trim();
      const emailVal = document.getElementById('userEmail').value.trim();
      const phoneVal = document.getElementById('userPhone').value.trim();
      const classVal = selectClass.value;
      const slotVal  = selectSlot.value;

      let valid = true;

      // validate name
      if (nameVal === '') {
        showError('userName', 'userNameError', 'Please enter your full name.');
        valid = false;
      } else {
        clearError('userName', 'userNameError');
      }

      // validate email
      if (emailVal === '') {
        showError('userEmail', 'userEmailError', 'Please enter your email address.');
        valid = false;
      } else if (!isValidEmail(emailVal)) {
        showError('userEmail', 'userEmailError', 'Please enter a valid email (e.g. name@example.com).');
        valid = false;
      } else {
        clearError('userEmail', 'userEmailError');
      }

      // validate phone - must be exactly 10 digits
      if (phoneVal === '') {
        showError('userPhone', 'userPhoneError', 'Please enter your phone number.');
        valid = false;
      } else if (!isValidPhone(phoneVal)) {
        showError('userPhone', 'userPhoneError', 'Phone number must be exactly 10 digits.');
        valid = false;
      } else {
        clearError('userPhone', 'userPhoneError');
      }

      // validate class selection
      if (classVal === '') {
        showError('selectClass', 'selectClassError', 'Please select a class.');
        valid = false;
      } else {
        clearError('selectClass', 'selectClassError');
      }

      // validate time slot
      if (slotVal === '') {
        showError('selectSlot', 'selectSlotError', 'Please select a time slot.');
        valid = false;
      } else {
        clearError('selectSlot', 'selectSlotError');
      }

      // validate at least one day is checked
      const daysError    = document.getElementById('daysError');
      const daysSelected = getSelectedDays();

      if (daysSelected === 'None chosen') {
        if (daysError) daysError.textContent = 'Please select at least one day.';
        valid = false;
      } else {
        if (daysError) daysError.textContent = '';
      }

      // all fields valid - show success card
      if (valid) {
        // build a personalised confirmation message
        successMsg.textContent =
          'Thank you, ' + nameVal + '! Your ' + classVal +
          ' sessions have been booked for ' + daysSelected +
          '. We\'ll send details to ' + emailVal + '.';

        // swap form card for success card
        formCard.style.display    = 'none';
        successCard.style.display = 'block';

        // clear localStorage now that booking is complete
        localStorage.removeItem('selectedClass');
      }

    });
  }

  // book another button - resets the form and shows it again
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', function () {
      // reset all form fields to their default values
      if (bookingForm) bookingForm.reset();

      // clear any leftover error messages and invalid styles
      document.querySelectorAll('.error-msg').forEach(function (el) {
        el.textContent = '';
      });
      document.querySelectorAll('.invalid').forEach(function (el) {
        el.classList.remove('invalid');
      });

      // refresh summary box to match the cleared form
      updateSummary();

      // swap success card back to the form
      successCard.style.display = 'none';
      formCard.style.display    = 'block';
    });
  }

  // clear the error on a field as soon as the user starts editing it
  const fieldErrorPairs = [
    ['userName',    'userNameError'],
    ['userEmail',   'userEmailError'],
    ['userPhone',   'userPhoneError'],
    ['selectClass', 'selectClassError'],
    ['selectSlot',  'selectSlotError'],
  ];

  fieldErrorPairs.forEach(function (pair) {
    const field = document.getElementById(pair[0]);
    if (field) {
      field.addEventListener('input',  function () { clearError(pair[0], pair[1]); });
      field.addEventListener('change', function () { clearError(pair[0], pair[1]); });
    }
  });

});
