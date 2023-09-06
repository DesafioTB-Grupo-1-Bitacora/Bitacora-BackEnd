const { deserializeToken } = require('../misc/authUtils')
const errors = require('../misc/errors');

module.exports = (req, res, next) => {
    return new Promise(function (resolve, reject) {
        deserializeToken(req)
            .then((payload) => {
                if (!payload) return next(errors[401]);
                res.locals = payload;
                resolve(next());
            })
            .catch((err) => {
                reject(err);
            });
    });
}