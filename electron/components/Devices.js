const api = require('../utils/api');
const DeviceForm = require('./DeviceForm');

function init(container) {
  container.innerHTML = `
    <h2>Devices</h2>
    <div id="devices-list"></div>
    <div id="device-form"></div>
    <div id="devices-error"></div>
  `;

  async function loadDevices() {
    try {
      const devices = await api.getDevices();
      document.getElementById('devices-list').innerHTML = devices.map(device => `
        <div>
          ${device.name} (${device.ip})
          <button data-id="${device._id}" class="delete-device">Delete</button>
        </div>
      `).join('');
    } catch (err) {
      document.getElementById('devices-error').textContent = 'Failed to load devices: ' + err.message;
    }
  }

  loadDevices();

  DeviceForm.init(document.getElementById('device-form'));

  document.getElementById('devices-list').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-device')) {
      const id = event.target.getAttribute('data-id');
      try {
        await api.deleteDevice(id);
        loadDevices();
      } catch (err) {
        document.getElementById('devices-error').textContent = 'Failed to delete device: ' + err.message;
      }
    }
  });
}

module.exports = { init };
