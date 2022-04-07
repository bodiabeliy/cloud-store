const Router = require("express");
const filesRouter = new Router()

const fileController = require("../controllers/fileController")

filesRouter.post('', fileController.getUserToken,  fileController.createFiles )
filesRouter.get('',  fileController.getUserToken, fileController.getFiles)


module.exports = filesRouter