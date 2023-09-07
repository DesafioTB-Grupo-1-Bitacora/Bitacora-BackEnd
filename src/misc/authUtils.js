const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getSecret } = require('../configs/secrets')

const getJwtSecret = async () => {
    return JSON.parse(await getSecret('jwt_secret')).jwt_secret;
}

const hashPass = async (password) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
}

const comparePass = (plain) => async (hash) => {
    return await bcrypt.compare(plain, hash);
};

const serializeToken = async (res, payload) => {
    const token = jwt.sign(payload, await getJwtSecret());
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + (60 * 60 * 1000)),
      secure: true,
      httpOnly: false,
    });
    return token;
}

const deserializeToken = async (req) => {
    //const { access_token } = req?.cookies || {};

    const token = req?.headers.cookie.split("=")[1];

    try {
        const payload = jwt.verify(token, await getJwtSecret());
        if (!payload) return false;
        return payload;
    } catch (error) {
        console.error("> [verify]: ", error.message);

        return false;
    }
};

const clearCookie = (res) => {
    res.clearCookie("access_token");
};

module.exports = {
    hashPass,
    comparePass,
    serializeToken,
    deserializeToken,
    clearCookie
}