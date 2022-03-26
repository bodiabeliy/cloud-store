const Router = require("express");
const filesRouter = new Router()
const authMiddleWare = require("../middleware/Authorization")

const fileController = require("../controllers/fileController")

filesRouter.post('',authMiddleWare, function() {
    fileController.createDir
})


module.exports = filesRouter