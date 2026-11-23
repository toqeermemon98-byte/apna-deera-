
const $ = s => document.querySelector(s);

let current = 'orders';
let cache = { orders: [], reservations: [], reviews: [] };
let supabaseClient = null;
let accessToken = '';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[c]));
}

function date(s) {
  return s ? new Date(s).toLocaleString() : '—';
}

function showLogin(message = '') {
  $('.admin-shell').style.display = 'none';

  let panel = $('#adminLogin');

  if (!panel) {
    panel = document.createElement('section');
    panel.id = 'adminLogin';

    panel.style.cssText = `
      max-width:430px;
      margin:70px auto;
      padding:32px;
      background:#15120d;
      border:1px solid rgba(214,168,63,.3);
      border-radius:12px;
      color:#f2d78e;
      box-shadow:0 20px 50px #0007;
    `;

    panel.innerHTML = `
      <h2 style="font-family:Cinzel,serif;margin:0 0 8px">
        APNA DEERA
      </h2>

      <p style="color:#b8ad99;font-size:12px;margin-bottom:24px">
        Secure Restaurant Admin Login
      </p>

      <form id="adminLoginForm">
        <label style="display:block;margin:12px 0 6px">
          Admin Email
        </label>

        <input id="adminEmail"
          type="email"
          required
          autocomplete="username"
          placeholder="Enter admin email"
          style="width:100%;padding:12px;background:#090806;color:white;border:1px solid #59451f;border-radius:6px">

        <label style="display:block;margin:16px 0 6px">
          Password
        </label>

        <input id="adminPassword"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Enter password"
          style="width:100%;padding:12px;background:#090806;color:white;border:1px solid #59451f;border-radius:6px">

        <button type="submit"
          id="loginButton"
          class="btn"
          style="width:100%;margin-top:20px">
          LOGIN TO DASHBOARD
        </button>

        <p id="loginMessage"
          role="alert"
          style="color:#e6a17d;font-size:12px;margin-top:14px">
        </p>
      </form>
    `;

    document.body.appendChild(panel);
  }

  panel.style.display = 'block';
  $('#loginMessage').textContent = message;
  $('#adminLoginForm').onsubmit = login;
}

function showDashboard() {
  $('#adminLogin').style.display = 'none';
  $('.admin-shell').style.display = 'grid';

  if (!$('#logoutButton')) {
    const button = document.createElement('button');
    button.id = 'logoutButton';
    button.className = 'btn btn-outline';
    button.textContent = 'Logout';
    button.onclick = logout;
    $('.admin-actions').appendChild(button);
  }
}


async function loadSupabase() {
  const response = await fetch('/api/config');

  if (!response.ok) {
    throw new Error('Supabase configuration API failed: ' + response.status);
  }

  const config = await response.json();

  if (!config.url || !config.anonKey) {
    throw new Error('Supabase URL or public key is missing.');
  }

  if (!window.supabase?.createClient) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/supabase.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Supabase library could not load.'));
      document.head.appendChild(script);
    });
  }

  if (!window.supabase?.createClient) {
    throw new Error('Supabase library is not available.');
  }

  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
}




async function login(event) {
  event.preventDefault();

  const button = $('#loginButton');
  const message = $('#loginMessage');

  button.disabled = true;
  button.textContent = 'PLEASE WAIT...';
  message.textContent = '';

  try {
    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email: $('#adminEmail').value.trim(),
        password: $('#adminPassword').value
      });

    if (error) throw error;

    accessToken = data.session.access_token;

    const response = await fetch('/api/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status === 401) {
      await supabaseClient.auth.signOut();
      accessToken = '';
      throw new Error('This account is not authorized as restaurant admin.');
    }

    if (!response.ok) {
      throw new Error('Admin verification failed.');
    }

    showDashboard();
    await load();

  } catch (error) {
    message.textContent = error.message || 'Login failed.';
  } finally {
    button.disabled = false;
    button.textContent = 'LOGIN TO DASHBOARD';
  }
}

async function logout() {
  await supabaseClient.auth.signOut();

  accessToken = '';

  cache = {
    orders: [],
    reservations: [],
    reviews: []
  };

  showLogin('You have been logged out.');
}

async function api(url, opts = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {})
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...opts,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

async function load() {
  try {
    [
      cache.orders,
      cache.reservations,
      cache.reviews
    ] = await Promise.all([
      api('/api/orders'),
      api('/api/reservations'),
      api('/api/reviews')
    ]);

    $('#ordersCount').textContent = cache.orders.length;

    $('#pendingCount').textContent =
      cache.orders.filter(x => x.status === 'Pending').length;

    $('#reservationsCount').textContent =
      cache.reservations.length;

    render();

  } catch (error) {
    $('#tableBody').innerHTML =
      `<tr><td>${esc(error.message)}</td></tr>`;
  }
}

function render() {
  if (current === 'orders') {
    $('#tableHead').innerHTML = `
      <tr>
        <th>Order</th>
        <th>Customer</th>
        <th>Items</th>
        <th>Total</th>
        <th>Payment</th>
        <th>Order time</th>
        <th>Status</th>
      </tr>
    `;

    $('#tableBody').innerHTML = cache.orders.map(o => `
      <tr>
        <td>
          <b>${esc(o.id)}</b><br>
          <small>${esc(o.orderType)}
          ${o.tableId ? ' · Table ' + esc(o.tableId) : ''}</small>
        </td>

        <td>
          ${esc(o.customer)}<br>
          ${esc(o.phone)}<br>
          ${esc(o.address)}
        </td>

        <td>
          ${(o.items || []).map(i =>
            esc(i.name) + ' × ' + esc(i.qty)
          ).join('<br>')}
        </td>

        <td>
          Rs. ${Number(o.total).toLocaleString('en-PK')}
        </td>

        <td>${esc(o.payment)}</td>

        <td>
          ${date(o.scheduledAt)}<br>
          <small>Placed: ${date(o.createdAt)}</small>
        </td>

        <td>
          <select data-status="${esc(o.id)}">
            ${[
              'Pending',
              'Preparing',
              'Out for delivery',
              'Delivered',
              'Cancelled'
            ].map(s => `
              <option ${s === o.status ? 'selected' : ''}>
                ${s}
              </option>
            `).join('')}
          </select>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="7">No orders yet.</td></tr>';
  }

  if (current === 'reservations') {
    $('#tableHead').innerHTML = `
      <tr>
        <th>Reference</th>
        <th>Guest</th>
        <th>Phone</th>
        <th>Date</th>
        <th>Time</th>
        <th>Guests</th>
        <th>Notes</th>
      </tr>
    `;

    $('#tableBody').innerHTML = cache.reservations.map(r => `
      <tr>
        <td>${esc(r.id)}</td>
        <td>${esc(r.name)}</td>
        <td>${esc(r.phone)}</td>
        <td>${esc(r.date)}</td>
        <td>${esc(r.time)}</td>
        <td>${esc(r.guests)}</td>
        <td>${esc(r.notes)}</td>
      </tr>
    `).join('') ||
      '<tr><td colspan="7">No reservation requests yet.</td></tr>';
  }

  if (current === 'reviews') {
    $('#tableHead').innerHTML = `
      <tr>
        <th>Guest</th>
        <th>Rating</th>
        <th>Review</th>
        <th>Date</th>
      </tr>
    `;

    $('#tableBody').innerHTML = cache.reviews.map(r => `
      <tr>
        <td>${esc(r.name)}</td>
        <td>${'★'.repeat(Number(r.rating))}</td>
        <td>${esc(r.message)}</td>
        <td>${date(r.createdAt)}</td>
      </tr>
    `).join('') ||
      '<tr><td colspan="4">No reviews yet.</td></tr>';
  }
}

document.querySelectorAll('[data-tab]').forEach(button => {
  button.addEventListener('click', () => {
    current = button.dataset.tab;

    document.querySelectorAll('[data-tab]').forEach(item => {
      item.classList.toggle(
        'active',
        item.dataset.tab === current
      );
    });

    const titles = {
      orders: 'Recent Orders',
      reservations: 'Reservation Requests',
      reviews: 'Customer Reviews'
    };

    $('#sectionTitle').textContent = titles[current];
    render();
  });
});

$('#tableBody').addEventListener('change', async event => {
  const select = event.target.closest('[data-status]');
  if (!select) return;

  try {
    await api(
      '/api/orders/' + encodeURIComponent(select.dataset.status) + '/status',
      {
        method: 'PATCH',
        body: JSON.stringify({ status: select.value })
      }
    );

    await load();

  } catch (error) {
    alert(error.message);
  }
});

$('#refresh').onclick = load;

async function startAdmin() {
  showLogin();

  try {
    await loadSupabase();

    const { data, error } =
      await supabaseClient.auth.getSession();

    if (error) throw error;

    if (data.session) {
      accessToken = data.session.access_token;

      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        showDashboard();
        await load();
        return;
      }

      await supabaseClient.auth.signOut();
      accessToken = '';
    }

    showLogin();

  } catch (error) {
    showLogin(error.message);
  }
}

startAdmin();

setInterval(() => {
  if (accessToken) load();
}, 15000);
