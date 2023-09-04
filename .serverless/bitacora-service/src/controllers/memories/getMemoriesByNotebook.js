const { getMemoriesByNotebook } = require("../../models/memories");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
    const { folder } = req.params;

    const response = await getMemoriesByNotebook(await db)(folder);

    if(!response.ok) return next(errors[500]);

    const memories = response.content.map(memory => {
        return { title: memory.title, url: memory.multimedia_url }
    });

    const filesArr = [];

    for(const memory of memories){
        const files = await getFiles(memory.url)
        console.log(files)
        filesArr.push({ title: memory.title, files: files});
    }

    res.status(200).json({
        success: true,
        data: response.content,
        multimedia: filesArr
    })
}