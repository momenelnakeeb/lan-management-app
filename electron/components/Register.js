const api = require('../utils/api');
const validation = require('../utils/validation');

function init(container) {
  container.innerHTML = `
    <h2>Register</h2>
    <form id="register-form">
      <label>Name:</label><input type="text" id="name" />
      <label>Email:</label><input type="email" id="email" />
      <label>Password:</label><input type="password" id="password" />
      <button type="submit">Register</button>
    </form>
    <div id="register-error"></div>
  `;

  document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { valid, errors } = validation.validateRegister({ name, email, password });

    if (!valid) {
      document.getElementById('register-error').textContent = errors.join(', ');
      return;
    }

    try {
      await api.register({ name, email, password });
      document.getElementById('register-error').textContent = 'Registration successful!';
    } catch (err) {
      document.getElementById('register-error').textContent = 'Registration failed: ' + err.message;
    }
  });
}

module.exports = { init };
