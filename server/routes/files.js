const Router = require("express");
const filesRouter = new Router()
const authMiddleWare = require("../middleware/Authorization")

const fileController = require("../controllers/fileController")

filesRouter.post('', authMiddleWare, fileController.createDir )
filesRouter.get('', authMiddleWare, fileController.getFiles)


module.exports = filesRouter