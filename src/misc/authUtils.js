const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hashPass = (password) => {
    const encryptedPassword = crypto.createHash("sha256").update(password).digest("hex");

    return encryptedPassword;
}

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
    serializeToken,
    deserializeToken,
    clearCookie
}