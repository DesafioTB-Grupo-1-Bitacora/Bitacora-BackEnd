const { insertMemory, selectMemoriesByUser, selectMemoryByTitle, selectAllMemories, removeMemory, selectNotebooksByUser, selectMemoriesByNotebook } = require("./queries")

const createMemory = (db) => async (title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email) => {
    try {
        await db.query(insertMemory(title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email));
        return { ok: true }
    } catch (error) {
        console.log("Error in createMemory:", error.message);
        return { ok: false }
    }
}

const getMemoriesByUser = (db) => async (email) => {
    try {
        const response = await db.query(selectMemoriesByUser(email));

        return {
            ok: true,
            content: response.rows
        }
    } catch (error) {
        console.log("Error in getMemoriesByUser:", error.message);

        return { ok: false }
    }
}

const getMemoriesByTitle = (db) => async (title) => {
    try {
        const response = await db.query(selectMemoryByTitle(title));

        return {
            ok: true,
            content: response.rows
        }
    } catch (error) {
        console.log("Error in getMemoriesByTitle:", error.message);

        return { ok: false }
    }
}

const getAllMemories = (db) => async () => {
    try {
        const response = await db.query(selectAllMemories());

        return {
            ok: true,
            content: response.rows
        }
    } catch (error) {
        console.log("Error in getAllMemories:", error.message);

        return { ok: false }
    }
}

const deleteMemory = (db) => async (title, email) => {
    try {
        await db.query(removeMemory(title, email));

        return { ok: true }
    } catch (error) {
        console.log("Error in deleteMemory:", error.message);

        return { ok: false }
    }
}

const getNotebooksByUser = (db) => async (email) =>{
    try {
        const response = await db.query(selectNotebooksByUser(email));

        return {
            ok: true,
            content: response.rows
        }
    } catch (error) {
        console.log("Error in getNotebooksByUser:", error.message);

        return { ok: false }
    }
}

const getMemoriesByNotebook = (db) => async (folder) => {
    try {
        const response = await db.query(selectMemoriesByNotebook(folder));

        return {
            ok: true,
            content: response.rows
        }
    } catch (error) {
        console.log("Error in getMemoriesByNotebook:", error.message);

        return { ok: false }
    }
}

module.exports = {
    createMemory,
    getMemoriesByUser,
    getMemoriesByTitle,
    getAllMemories,
    deleteMemory,
    getNotebooksByUser,
    getMemoriesByNotebook
}