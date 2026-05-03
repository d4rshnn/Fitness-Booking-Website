

document.addEventListener('DOMContentLoaded', function () {

  
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



  const selectClass = document.getElementById('selectClass');

  if (selectClass) {
    const saved = localStorage.getItem('selectedClass');
    if (saved) {

      for (let i = 0; i < selectClass.options.length; i++) {
        if (selectClass.options[i].value === saved) {
          selectClass.selectedIndex = i;
          break;
        }
      }
    }
  }




  const sumClass = document.getElementById('sumClass');
  const sumSlot  = document.getElementById('sumSlot');
  const sumDays  = document.getElementById('sumDays');
  const sumCombo = document.getElementById('sumCombo');


  const selectSlot  = document.getElementById('selectSlot');
  const comboPlan   = document.getElementById('comboPlan');
  const dayCheckboxes = document.querySelectorAll('input[name="days"]');


  function getSelectedDays() {
    const selected = [];
    dayCheckboxes.forEach(function (cb) {
      if (cb.checked) selected.push(cb.value);
    });
    return selected.length > 0 ? selected.join(', ') : 'None chosen';
  }


  function updateSummary() {
    if (sumClass) {
      sumClass.textContent = selectClass.value || 'Not selected';
    }
    if (sumSlot) {
      sumSlot.textContent = selectSlot.value || 'Not selected';
    }
    if (sumDays) {
      sumDays.textContent = getSelectedDays();
    }
    if (sumCombo) {
      sumCombo.textContent = comboPlan.value || 'None';
    }
  }


  if (selectClass) selectClass.addEventListener('change', updateSummary);
  if (selectSlot)  selectSlot.addEventListener('change', updateSummary);
  if (comboPlan)   comboPlan.addEventListener('change', updateSummary);

  dayCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', updateSummary);
  });


  updateSummary();





  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field)  field.classList.add('invalid');
    if (error)  error.textContent = message;
  }


  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field)  field.classList.remove('invalid');
    if (error)  error.textContent = '';
  }


  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }



  const bookingForm = document.getElementById('bookingForm');
  const formCard    = document.getElementById('formCard');
  const successCard = document.getElementById('successCard');
  const successMsg  = document.getElementById('successMsg');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {

      e.preventDefault();


      const nameVal  = document.getElementById('userName').value.trim();
      const emailVal = document.getElementById('userEmail').value.trim();
      const phoneVal = document.getElementById('userPhone').value.trim();
      const classVal = selectClass.value;
      const slotVal  = selectSlot.value;


      let valid = true;

      
      if (nameVal === '') {
        showError('userName', 'userNameError', 'Please enter your full name.');
        valid = false;
      } else {
        clearError('userName', 'userNameError');
      }

      
      if (emailVal === '') {
        showError('userEmail', 'userEmailError', 'Please enter your email address.');
        valid = false;
      } else if (!isValidEmail(emailVal)) {
        showError('userEmail', 'userEmailError', 'Please enter a valid email (e.g. name@example.com).');
        valid = false;
      } else {
        clearError('userEmail', 'userEmailError');
      }

      
      if (phoneVal === '') {
        showError('userPhone', 'userPhoneError', 'Please enter your phone number.');
        valid = false;
      } else if (!isValidPhone(phoneVal)) {
        showError('userPhone', 'userPhoneError', 'Phone number must be exactly 10 digits.');
        valid = false;
      } else {
        clearError('userPhone', 'userPhoneError');
      }

      
      if (classVal === '') {
        showError('selectClass', 'selectClassError', 'Please select a class.');
        valid = false;
      } else {
        clearError('selectClass', 'selectClassError');
      }

      
      if (slotVal === '') {
        showError('selectSlot', 'selectSlotError', 'Please select a time slot.');
        valid = false;
      } else {
        clearError('selectSlot', 'selectSlotError');
      }

      
      const daysError = document.getElementById('daysError');
      const daysSelected = getSelectedDays();

      if (daysSelected === 'None chosen') {
        if (daysError) daysError.textContent = 'Please select at least one day.';
        valid = false;
      } else {
        if (daysError) daysError.textContent = '';
      }

      
      if (valid) {

        successMsg.textContent =
          'Thank you, ' + nameVal + '! Your ' + classVal +
          ' sessions have been booked for ' + daysSelected +
          '. We\'ll send details to ' + emailVal + '.';


        formCard.style.display    = 'none';
        successCard.style.display = 'block';


        localStorage.removeItem('selectedClass');
      }

    }); 
  }



  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', function () {

      if (bookingForm) bookingForm.reset();


      document.querySelectorAll('.error-msg').forEach(function (el) {
        el.textContent = '';
      });
      document.querySelectorAll('.invalid').forEach(function (el) {
        el.classList.remove('invalid');
      });


      updateSummary();


      successCard.style.display = 'none';
      formCard.style.display    = 'block';
    });
  }


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
      field.addEventListener('input', function () {
        clearError(pair[0], pair[1]);
      });
      field.addEventListener('change', function () {
        clearError(pair[0], pair[1]);
      });
    }
  });

}); 
