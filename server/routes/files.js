const Router = require("express");
const filesRouter = new Router()
// const authMiddleWare = require("../middleware/Authorization")

const fileController = require("../controllers/fileController")

filesRouter.post('',  fileController.createDir )
filesRouter.get('', fileController.getFiles)


module.exports = filesRouter