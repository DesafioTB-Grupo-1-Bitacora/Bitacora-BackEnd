
const insertMemory = (title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email) => {
    return {
        text: "INSERT INTO memories (title, description, notebook, location, date, latitude, longitude, public, multimedia_url, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM users WHERE email = $10))",
        values: [title, description, notebook, location, date, latitude, longitude, public, multimedia_url, email]
    }
}

const selectMemoriesByUser = (email) => {
    return {
        text: "SELECT * FROM memories INNER JOIN users ON memories.created_by = users.id WHERE users.email = $1",
        values: [email]
    }
}

const selectMemoryByTitle = (title) => {
    return {
        text: "SELECT * FROM memories WHERE title = $1",
        values: [title]
    }
}

const selectAllMemories = () => {
    return {
        text: "SELECT * FROM memories"
    }
}

const removeMemory = (title, email) => {
    return {
        text: "DELETE FROM memories WHERE title = $1 AND created_by = (SELECT id FROM users WHERE email = $2)",
        values: [title, email]
    }
}

const selectNotebooksByUser = (email) => {
    return {
        text: "SELECT notebook FROM memories WHERE created_by = (SELECT id FROM users WHERE email = $1)",
        values: [email]
    }
}

const selectMemoriesByNotebook = (notebook) => {
    return {
        text: "SELECT * FROM memories WHERE notebook = $1",
        values: [notebook]
    }
}

module.exports = {
    insertMemory,
    selectMemoriesByUser,
    selectMemoryByTitle,
    selectAllMemories,
    removeMemory,
    selectNotebooksByUser,
    selectMemoriesByNotebook
}