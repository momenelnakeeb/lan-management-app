const api = require('../utils/api');
const validation = require('../utils/validation');

function init(container) {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <label>Email:</label><input type="email" id="login-email" required />
      <label>Password:</label><input type="password" id="login-password" required />
      <button type="submit">Login</button>
    </form>
    <div id="login-error" class="error"></div>
  `;

  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Login attempt:', { email, password });

    const { valid, errors } = validation.validateLogin({ email, password });

    if (!valid) {
      console.log('Validation errors:', errors);
      document.getElementById('login-error').textContent = errors.join(', ');
      return;
    }

    try {
      console.log('Sending login request...');
      const token = await api.login({ email, password });
      console.log('Token received:', token);
      document.getElementById('login-error').textContent = 'Login successful!';
      localStorage.setItem('token', token);
      // Redirect or update UI
    } catch (err) {
      console.log('Login error:', err.message);
      document.getElementById('login-error').textContent = 'Login failed: ' + err.message;
    }
  });
}

module.exports = { init };
