const axios = require('axios');

const api = {
  addDevice: async (device) => {
    try {
      const response = await axios.post(`${window.electron.apiUrl}/api/devices`, device, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Device added:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding device:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getDevices: async () => {
    try {
      const response = await axios.get(`${window.electron.apiUrl}/api/devices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Devices retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting devices:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  deleteDevice: async (id) => {
    try {
      const response = await axios.delete(`${window.electron.apiUrl}/api/devices/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('Device deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting device:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

module.exports = api;
