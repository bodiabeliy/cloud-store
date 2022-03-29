const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")


class FileController {

    //
    async createDir(request, response) {
        try {
            const {name, type, parent} = request.body
            const creatingFile = new File({name, type, parent, user:request.user})

            // определяем имеет ли созданный файл родителя
            const parentFile = await File.findOne({_id:parent})
            if (!parentFile) {
                creatingFile.path = name
                await FileService.createDir(creatingFile)
            }
            else {
                creatingFile.path = `${parentFile.path}/${creatingFile.name}`
                await FileService.createDir(creatingFile)
                parentFile.childern.push(creatingFile._id)
                await parentFile.save()
            }
            await creatingFile.save()
            return response.json(creatingFile)
            
        } catch (error) {
            console.log(error);
            return response.status(400).json(error)
        }
    }
    async getFiles (request, response) {
        try {
            const files = await File.find({ parent: request.query.parent})
            return response.json({files})
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

module.exports = new FileController()