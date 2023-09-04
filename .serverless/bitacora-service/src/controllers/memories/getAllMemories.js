const errors = require("../../misc/errors");
const { getAllMemories } = require("../../models/memories");

const { getFiles } = require("../../misc/cloudinary");

module.exports = (db) => async (req, res, next) => {
  const response = await getAllMemories(await db)();

  if (!response.ok) return next(errors[500]);

  const memories = response.content.map((memory) => {
    return { title: memory.title, url: memory.multimedia_url };
  });

  const filesArr = [];

  for (const memory of memories) {
    const files = await getFiles(memory.url);

    filesArr.push({ title: memory.title, files: files });
  }

  res.status(200).json({
    success: true,
    data: response.content,
    multimedia: filesArr,
  });
};
