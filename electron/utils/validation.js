function validateRegister({ name, email, password }) {
  const errors = [];
  if (!name) errors.push('Name is required');
  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('Invalid email');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  return { valid: errors.length === 0, errors };
}

function validateLogin({ email, password }) {
  const errors = [];
  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('Invalid email');
  if (!password) errors.push('Password is required');
  return { valid: errors.length === 0, errors };
}

function validateDevice({ name, ip }) {
  const errors = [];
  if (!name) errors.push('Device name is required');
  if (!ip || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) errors.push('Invalid IP address');
  return { valid: errors.length === 0, errors };
}

module.exports = { validateRegister, validateLogin, validateDevice };
