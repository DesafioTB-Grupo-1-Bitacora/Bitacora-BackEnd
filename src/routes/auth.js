const router = require("express").Router();
const { authorizer, fieldsValidator } = require("../middlewares");

const authCtrl = require("../controllers/auth");

const signupValidator = fieldsValidator("email", "username", "password");
const signinValidator = fieldsValidator("email", "password");

module.exports = (db) => {
    router.post("/signup", signupValidator, authCtrl.signup(db));
    router.post("/signin", signinValidator, authCtrl.signin(db));
    router.post("/signout", authorizer, authCtrl.signout());
    router.get("/user", authorizer, authCtrl.getUser());

    return router;
}