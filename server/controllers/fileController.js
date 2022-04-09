const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")
const path = require('path');

const config  = require("config")

const jwt = require("jsonwebtoken")

const {UploadFiles} = require("../s3")

class FileController {

    //
    async createFiles(request, response) {
        try {
            const {name, type, parent} = request.body
            const creatingFile = new File({name, type, parent, user:request.user.id})
            // определяем имеет ли созданный файл родителя
            const parentFile = await File.findOne({_id:parent})

            if (!parentFile) {
               
                creatingFile.path = name
                await FileService.createDir(creatingFile)
                await UploadFiles(creatingFile)

            }
            else {
                creatingFile.path = `${parentFile.path}/${creatingFile.name}`
                await FileService.createDir(creatingFile)
                parentFile.children.push(creatingFile._id)
                await parentFile.save()
            }
            await creatingFile.save()

            return response.json(creatingFile)
            
        } catch (error) {
            console.log('error block');
            return response.status(400).json(error)
        }
    }

    // сохранякм данные о пользователе в токен доступа
    async getUserToken (request, response, next) {
        if (request.methods === "OPTOIONS") {
            next()
        }
    
        try {
           const token = request.headers.authorization.split(' ')[1]
            if(!token) {
               console.log("Authorization failed!");
            }
            const decoded = jwt.verify(token, config.get("secretKey"))
            request.user = decoded
            next()
        } catch (error) {
            return response.status(400).json({message: request.user})
        }
    }
    // получаем все файлы польователя
    async getFiles (request, response) {
        try {
            const files = await File.find({  user:request.user.id, parent: request.query.parent})
            return response.json(files)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
    // получаемтекущий файл пользователя
    async getFile (request, response) {
        try {
            const file = await File.findOne({  user:request.user.id, _id:request.query.id})
            if (!file) return res.status(400).json({message: "file not found!"})
           
            return response.json(file)
        } catch (error) {
            return response.status(500).json(error)
        }
    }
    async deleteFile (request, response) {
        try {
            const file = await File.findOne({  user:request.user.id, _id:request.query.id})
            if (!file) return res.status(400).json({message: "file not found!"})
           FileService.deleteFile(file)
           await file.remove()
            return response.json({message: "file was deleted successfully!"})
        } catch (error) {
            return response.status(400).json({message: "Folder must be empty!"})
        }
    }
}

module.exports = new FileController()