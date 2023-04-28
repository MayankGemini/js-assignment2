const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('clr');
const csvButton = document.getElementById('csvExtractor');
const tableBody = document.querySelector('#myTable tbody');

submitButton.addEventListener('click', validateInputs);
resetButton.addEventListener('click', resetForm);
csvButton.addEventListener('click', exportToCSV);

function validateInputs(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!isValidName(name)) {
    alert('Please enter a valid name.');
    nameInput.focus();
  } else if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    emailInput.focus();
  } else if (!isValidPhone(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    phoneInput.focus();
  } else {
    saveData(name, email, phone);
    updateTable();
    resetForm();
  }
}

function isValidName(name) {
  return /^[a-zA-Z ]+$/.test(name);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone);
}

function saveData(name, email, phone) {
  let data = JSON.parse(localStorage.getItem('data')) || [];
  data.push({ name, email, phone });
  localStorage.setItem('data', JSON.stringify(data));
}

function updateTable() {
  const data = JSON.parse(localStorage.getItem('data')) || [];

  // Clear existing rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Add new rows
  data.forEach((item, index) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = index + 1;
    row.insertCell().textContent = item.name;
    row.insertCell().textContent = item.email;
    row.insertCell().textContent = item.phone;
  });
}

function resetForm() {
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  nameInput.focus();
}

function exportToCSV() {
  const data = JSON.parse(localStorage.getItem('data')) || [];

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Name,Email,Phone\n';
  data.forEach((item) => {
    csvContent += `${item.name},${item.email},${item.phone}\n`;
  });

  const encodedURI = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', 'data.csv');
  link.textContent = 'Download CSV';

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  resultsDiv.appendChild(link);
}
