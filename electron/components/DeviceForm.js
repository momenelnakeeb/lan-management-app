const api = require('../utils/api');
const validation = require('../utils/validation');

function init(container) {
  container.innerHTML = `
    <h3>Add/Update Device</h3>
    <form id="device-form">
      <label>Name:</label><input type="text" id="device-name" />
      <label>IP Address:</label><input type="text" id="device-ip" />
      <button type="submit">Submit</button>
    </form>
    <div id="device-form-error
    <div id="device-form-error"></div>
  `;

  document.getElementById('device-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('device-name').value;
    const ip = document.getElementById('device-ip').value;

    const { valid, errors } = validation.validateDevice({ name, ip });

    if (!valid) {
      document.getElementById('device-form-error').textContent = errors.join(', ');
      return;
    }

    try {
      await api.addDevice({ name, ip });
      document.getElementById('device-form-error').textContent = 'Device added/updated successfully!';
      // Optionally, you can trigger a refresh of the devices list
      // e.g., document.getElementById('devices-list').dispatchEvent(new Event('refresh'));
    } catch (err) {
      document.getElementById('device-form-error').textContent = 'Failed to add/update device: ' + err.message;
    }
  });
}

module.exports = { init };
