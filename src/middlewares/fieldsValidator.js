const errors = require("../misc/errors");

module.exports =
  (...fields) =>
  (req, _, next) => {
    for (let field of fields) {
      if (!req.body[field]) return next(errors[400]);
    }

    const { password } = req.body;
    // Validaciones de contraseña robusta
    if (password && password.length < 12) return next(errors["pass_length"]);

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password);

    if (!(hasLowerCase && hasUpperCase && hasNumbers && hasSymbols)) {
      return next(errors["pass_complexity"]);
    }

    next();
  };
