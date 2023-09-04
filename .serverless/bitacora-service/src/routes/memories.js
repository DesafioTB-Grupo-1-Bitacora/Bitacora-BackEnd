const router = require("express").Router();
const { authorizer } = require("../middlewares");

const memoriesCtrl = require("../controllers/memories");

module.exports = (db) => {
    router.post("/", authorizer, memoriesCtrl.createMemory(db));
    router.get("/", memoriesCtrl.getAllMemories(db));
    router.get("/user", authorizer, memoriesCtrl.getMemoriessByUser(db));
    router.get("/user/notebooks", authorizer, memoriesCtrl.getNotebooksByUser(db));
    router.get("/folder/:folder", authorizer, memoriesCtrl.getMemoriesByNotebook(db));
    router.get("/:title", memoriesCtrl.getMemoriesByTitle(db));
    router.put("/", authorizer, memoriesCtrl.editMemory(db));
    router.delete("/", authorizer, memoriesCtrl.deleteMemory(db));

    return router;
}