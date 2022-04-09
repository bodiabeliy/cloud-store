const Router = require("express");
const filesRouter = new Router()

const fileController = require("../controllers/fileController")

filesRouter.post('', fileController.getUserToken,  fileController.createFiles )
filesRouter.get('',  fileController.getUserToken, fileController.getFiles)
filesRouter.get('/', fileController.getUserToken, fileController.getFile)
filesRouter.delete('/',  fileController.getUserToken, fileController.deleteFile)


module.exports = filesRouter