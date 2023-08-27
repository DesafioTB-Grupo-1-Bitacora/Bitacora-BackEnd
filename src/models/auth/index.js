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

const selectUser = (db) => async (email, compareFn) => {
  try {
    const response = await db.query(selectByEmail(email));

    const [user] = response.rows;

    if (!user)
      return {
        ok: false,
        error_code: "wrong_data",
      };
    
    const areEqual = await compareFn(user.password);

    if (!areEqual)
      return {
        ok: false,
        error_code: "wrong_data",
      };

    return {
      ok: true,
      content: {
        username: user.username,
        email: user.email
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
