const { getMemoriesByTitle } = require("../../models/memories");
const { getFiles } = require("../../misc/cloudinary");
const errors = require("../../misc/errors");

module.exports = (db) => async (req, res, next) => {
  const { title } = req.params;

  const response = await getMemoriesByTitle(await db)(title);

  if (!response.ok) return next(errors[500]);

  const [memory] = response.content;

  const files = await getFiles(memory.multimedia_url);

  res.status(200).json({
    success: true,
    data: response.content,
    multimedia: files,
  });
};
