const { insertUser, selectByEmail } = require("./queries");
const { hashPass } = require("../../misc/authUtils");

const createUser = (db) => async (email, username, password) => {
  try {
    await db.query(insertUser(email, username, password));
    return { ok: true };
  } catch (error) {
    console.log("Error in createUser: ", error.message);
    return { ok: false };
  }
};

const selectUser = (db) => async (email, password) => {
  try {
    const user = await db.maybeOne(selectByEmail(email));

    if (!user)
      return {
        ok: false,
        error_code: "wrong_data",
      };

    const areEqual = hashPass(password) === user.password;

    if (!areEqual)
      return {
        ok: false,
        error_code: "wrong_data",
      };

    return {
      ok: true,
      content: {
        username: user.username,
      },
    };
  } catch (error) {
    console.log("Error in selectUser: ", error.message);
    return { ok: false };
  }
};

module.exports = db = {
  createUser,
  selectUser,
};
