const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")


class FileController {

    //
    async createFolder(request, responce) {
        try {
            const {name, type, parent} = request.body
            const creatingFile = new File({name, type, parent, user: request.user.id})

            // определяем путь для созданого файла
            const parentFile = await File.findOne({id:parent})
            if (!parentFile) {
                creatingFile.path = name
                await FileService.createFolder(creatingFile)
            }
            else {
                creatingFile.path = `${parentFile.path}\\${creatingFile.name}`
                await FileService.createFolder(creatingFile)
                parentFile.childern.push(creatingFile.id)
                await parentFile.save()
            }
            await creatingFile.save()
            return responce.json(file)
            
        } catch (error) {
            return responce.status(400).json(error)
        }
    }
}

module.exports = FileController