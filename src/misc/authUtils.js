const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPass = async (password) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
}

const comparePass = (plain) => async (hash) => {
    return await bcrypt.compare(plain, hash);
};

const serializeToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.SECRET);

    res.cookie("access_token", token, {
      expires: new Date(Date.now() + (60 * 60 * 1000)),
      secure: true,
      httpOnly: true,
    });
}

const deserializeToken = (req) => {
    const { access_token } = req?.cookies || {};
    try {
        const payload = jwt.verify(access_token, process.env.SECRET);
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