//const { hash, serialize } = require("simple-stateless-auth-library");
const { selectUser } = require("../../models/auth");
const errors = require("../../misc/errors");
const { serializeToken } = require("../../misc/authUtils");

// Define una variable global para llevar el registro de los intentos de inicio de sesión
const loginAttempts = {};

module.exports = (db) => async (req, res, next) => {
  const { email, password } = req.body;

  // Verifica si ha habido más de 5 intentos de inicio de sesión fallidos en los últimos 5 minutos
  if (loginAttempts[email] && loginAttempts[email].attempts >= 5) {
    return next(errors["blocked_account"]);
  }

  const response = await selectUser(await db)(email, password);

  if (!response.ok) {
    // Si el usuario no existe o la contraseña es incorrecta, incrementa el contador de intentos
    loginAttempts[email] = loginAttempts[email] || {
      attempts: 0,
      timestamp: Date.now(),
    };
    loginAttempts[email].attempts += 1;

    return next(errors[response.error_code || 500]);
  }

  // Si el inicio de sesión es exitoso, reinicia el contador de intentos para ese usuario
  loginAttempts[email] = { attempts: 0, timestamp: Date.now() };

  serializeToken(res, response.content);

  res.status(200).json({
    success: true,
  });
};
