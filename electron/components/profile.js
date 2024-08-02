const api = require('../utils/api');

function init(container) {
  container.innerHTML = `
    <h2>Profile</h2>
    <div id="profile-info"></div>
    <button id="update-profile">Update Profile</button>
    <div id="profile-error"></div>
  `;

  async function loadProfile() {
    try {
      const profile = await api.getProfile();
      document.getElementById('profile-info').textContent = JSON.stringify(profile);
    } catch (err) {
      document.getElementById('profile-error').textContent = 'Failed to load profile: ' + err.message;
    }
  }

  loadProfile();

  document.getElementById('update-profile').addEventListener('click', async () => {
    // Handle profile update logic
  });
}

module.exports = { init };
