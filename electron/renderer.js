document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const deviceManagement = document.getElementById('deviceManagement');
    const homeScreen = document.getElementById('home');
    const apiUrl = 'http://localhost:5001'; // Ensure this matches your server's URL
  
    console.log('DOM content loaded');
  
    document.getElementById('showLogin').addEventListener('click', () => {
        console.log('Show Login form');
        homeScreen.style.display = 'none';
        loginForm.style.display = 'block';
    });
  
    document.getElementById('showRegister').addEventListener('click', () => {
        console.log('Show Register form');
        homeScreen.style.display = 'none';
        registerForm.style.display = 'block';
    });
  
    document.getElementById('backToHome').addEventListener('click', () => {
        console.log('Back to Home from Login');
        loginForm.style.display = 'none';
        homeScreen.style.display = 'block';
    });
  
    document.getElementById('backToHomeFromRegister').addEventListener('click', () => {
        console.log('Back to Home from Register');
        registerForm.style.display = 'none';
        homeScreen.style.display = 'block';
    });
  
    document.getElementById('logout').addEventListener('click', () => {
        console.log('Logout');
        localStorage.removeItem('token');
        deviceManagement.style.display = 'none';
        homeScreen.style.display = 'block';
    });
  
    document.getElementById('login').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
  
      console.log('Attempting login with:', { email, password });
      console.log('API URL:', `${apiUrl}/api/auth/login`);
  
      try {
          const response = await window.axios.post(`${apiUrl}/api/auth/login`, { email, password });
          console.log('Login response:', response.data);
          localStorage.setItem('token', response.data.token);
          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('deviceManagement').style.display = 'block';
      } catch (error) {
          console.error('Login error:', error.response ? error.response.data : error.message);
          document.getElementById('loginError').textContent = 'Login failed. Please try again.';
      }
    });
  
    document.getElementById('register').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
  
      console.log('Registration form submitted', { email, password });
  
      try {
          await window.axios.post(`${apiUrl}/api/auth/register`, { email, password });
          console.log('Registration successful');
          alert('Registration successful. You can now log in.');
          document.getElementById('registerForm').style.display = 'none';
          document.getElementById('home').style.display = 'block';
      } catch (error) {
          console.error('Registration error:', error.response ? error.response.data : error.message);
          document.getElementById('registerError').textContent = 'Registration failed. Please try again.';
      }
    });
  
    document.getElementById('showDevices').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      console.log('Fetch devices', { token });
  
      try {
          const response = await window.axios.get(`${apiUrl}/api/devices`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Devices fetched successfully', response.data);
          const deviceList = document.getElementById('deviceList');
          deviceList.innerHTML = '';
          response.data.forEach(device => {
              const li = document.createElement('li');
              li.textContent = `${device.name} - ${device.ip}`;
              deviceList.appendChild(li);
          });
      } catch (error) {
          console.error('Error fetching devices:', error);
          alert('Failed to get devices');
      }
    });
  });
  