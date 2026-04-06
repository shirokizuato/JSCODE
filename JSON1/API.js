// Base URL for the JSONPlaceholder API, which provides fake REST API endpoints
const BASE = 'https://jsonplaceholder.typicode.com';
// Current selected HTTP method, defaults to GET
let method = 'GET';

// Color scheme for different HTTP methods, matching the UI theme
const COLORS = {
  GET:    '#ff6700',
  POST:   '#004d99',
  PUT:    '#e60000',
  PATCH:  '#5b2c6f',
  DELETE: '#333333'
};

// Function to update the UI based on the selected method
// Shows/hides input fields and updates URL display and button colors
function updateUI() {
  // Check if current method is GET or DELETE
  const isGET    = method === 'GET';
  const isDELETE = method === 'DELETE';

  // Show note for GET method, hide for others
  document.getElementById('getNote').style.display = isGET ? 'block' : 'none';
  // Show ID field for non-GET methods
  document.getElementById('idRow').style.display   = isGET ? 'none'  : 'flex';

  // Show name, username, email, address fields only for POST, PUT, PATCH
  ['nameRow', 'usernameRow', 'emailRow', 'addressRow'].forEach(id => {
    document.getElementById(id).style.display = (isGET || isDELETE) ? 'none' : 'flex';
  });

  // Update URL display based on method
  if (isGET) {
    document.getElementById('urlDisplay').textContent = 'jsonplaceholder.typicode.com/users';
  } else {
    const id = document.getElementById('fId').value || '1';
    document.getElementById('urlDisplay').textContent = `jsonplaceholder.typicode.com/users/${id}`;
  }

  // Update send button color to match method
  const btn = document.getElementById('sendBtn');
  btn.style.background  = COLORS[method];
  btn.style.boxShadow   = `0 4px 0 ${COLORS[method]}88`;
}

// Add click event listeners to all method buttons
// When clicked, update the active method and refresh the UI
document.querySelectorAll('.method-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    // Update current method
    method = btn.dataset.method;
    // Refresh UI to reflect new method
    updateUI();
  });
});

// Update UI when ID input changes (for URL display)
document.getElementById('fId').addEventListener('input', updateUI);

// Main function to send the API request
async function sendRequest() {
  // Get the ID value, default to 1 if empty
  const id  = document.getElementById('fId').value || '1';
  // Construct URL: /users for GET/POST, /users/{id} for others
  const url = (method === 'GET' || method === 'POST')
    ? `${BASE}/users`
    : `${BASE}/users/${id}`;

  // Set up request options with method and JSON headers
  const opts = { method, headers: { 'Content-Type': 'application/json' } };

  // Add request body for methods that need data (POST, PUT, PATCH)
  if (!['GET', 'DELETE'].includes(method)) {
    opts.body = JSON.stringify({
      id:       +id,  // Convert to number
      name:     document.getElementById('fName').value,
      username: document.getElementById('fUsername').value,
      email:    document.getElementById('fEmail').value,
      address:  { city: document.getElementById('fAddress').value }
    });
  }

  // Update button text to show loading state
  const btn = document.getElementById('sendBtn');
  btn.textContent = 'Wait...';

  try {
    // Send the fetch request
    const res  = await fetch(url, opts);
    // Parse JSON response
    const data = await res.json();

    // Update status badge with HTTP status code
    const badge = document.getElementById('statusBadge');
    badge.textContent = res.status;
    // Set badge color based on status: green for success, red for error, blue for created
    badge.className   = 'status-badge ' +
      (res.status === 201 ? 'create' : res.status < 300 ? 'ok' : 'err');

    // Update status text
    document.getElementById('statusText').textContent =
      res.status < 300 ? 'Success!' : 'Failed!';

    // Render response: table for GET (array), single item for others
    if (method === 'GET' && Array.isArray(data)) {
      renderTable(data);
    } else {
      renderSingle(res.status, data, id);
    }
  } catch (e) {
    // Handle network errors
    document.getElementById('statusText').textContent = 'Error detected (Error)!';
  }

  // Reset button text
  btn.textContent = 'SEND';
}

// Render the response as a table when GET returns an array of users
function renderTable(users) {
  // Hide the single response body display
  document.getElementById('responseBody').style.display = 'none';
  // Show the table wrapper
  const wrap  = document.getElementById('tableWrap');
  const tbody = document.getElementById('userTableBody');
  // Clear existing table rows
  tbody.innerHTML = '';

  // Create a table row for each user
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="id-cell">${u.id}</td>
      <td>${u.name}</td>
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td>${u.address?.city}</td>
    `;
    tbody.appendChild(tr);
  });

  // Make the table visible
  wrap.style.display = 'block';
}

// Render the response as key-value pairs for single user operations (POST, PUT, PATCH, DELETE)
function renderSingle(status, data, id) {
  // Hide the table display
  document.getElementById('tableWrap').style.display = 'none';
  // Show the response body display
  const body = document.getElementById('responseBody');
  body.style.display = 'block';
  // Clear existing content
  body.innerHTML = '';

  // Special case for DELETE: just show confirmation message
  if (method === 'DELETE') {
    body.innerHTML = `User #${id} has been removed.`;
    return;
  }

  // Define which fields to display for the user data
  const fieldsToShow = [
    { label: 'ID',       value: data.id },
    { label: 'Name',     value: data.name },
    { label: 'Username', value: data.username },
    { label: 'Address',  value: data.address?.city || 'Unknown' },
    { label: 'E-mail',   value: data.email },
  ];

  // Create a row for each field
  fieldsToShow.forEach(field => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<span class="key">${field.label}:</span><span class="val">${field.value}</span>`;
    body.appendChild(row);
  });
}

// Initialize the UI on page load
updateUI();