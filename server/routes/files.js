const Router = require("express");
const File = require("../models/File")
const FileController = require("../controllers/fileController")
// const authMiddleware = require("")

const filesRouter = new Router()

router.post('', FileController.createFolders)

module.exports = filesRouter