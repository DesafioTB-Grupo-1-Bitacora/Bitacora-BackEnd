const { getFiles } = require("../../misc/cloudinary");
const errors = require("../../misc/errors");
const { getMemoriesByUser } = require("../../models/memories");

module.exports = (db) => async (req, res, next) => {
    const { email } = res.locals;

    const response = await getMemoriesByUser(await db)(email);

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