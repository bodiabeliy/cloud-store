const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")
const path = require('path');

const config  = require("config")
const fs = require("fs")
const fs_extra  = require("fs-extra")
const jwt = require("jsonwebtoken")

const {UploadFiles} = require("../s3")

class FileController {

    // создание файлов
    async createFiles(request, response) {
        try {
            const {name, type, parent} = request.body
            console.log('request.body =', request.body);
            //
            const creatingFile = new File({name, type, parent, user:request.user.id})

            // определяем имеет ли созданный файл родителя
            const parentFile = await File.findOne({_id:parent})

            if (!parentFile) {
               
                creatingFile.path = name
                await FileService.createDir(request, creatingFile)
                await UploadFiles(creatingFile)

            }
            else {
                creatingFile.path = `${parentFile.path}/${creatingFile.name}`
                await FileService.createDir(request, creatingFile)
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

    // сохраняeм данные о пользователе в токен доступа
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
            //
            const files = await File.find({  user:request.user.id, parent: request.query.parent})
            return response.json(files)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    // получаемтекущий файл пользователя
    async getFile (request, response) {
        try {
            //
            const file = await File.findOne({  user:request.user.id, _id:request.query.id})
            if (!file) return res.status(400).json({message: "file not found!"})
           
            return response.json(file)
        } catch (error) {
            return response.status(500).json(error)
        }
    }

    // удаление файла
    async deleteFile (request, response) {
        try {
            //
            const file = await File.findOne({  user:request.user.id, _id:request.query.id})

            if (!file) return res.status(400).json({message: "file not found!"})
            //
           FileService.deleteFile(request, file)
           await file.remove()
            return response.json({message: "file was deleted successfully!"})
        } catch (error) {
            console.log(error);
            return response.status(400).json({message: "Folder must be empty!"})
        }
    }

    // загрузка файла
    async uploadFile (request, response) {
        console.log('upload',request.files);
        try {
            const file = request.files.file

            
            //
            const user = await User.findOne({_id: request.user.id})

            //
            if (user.userSpace + file.size > user.diskSpace ) {
                return response.status(400).json({message:"error upload!"})
            }
            
            user.userSpace = user.userSpace + file.size

            //
            let pathUpload

                pathUpload = `${request.filePath}\\${user._id}\\${file.name}`

            //
            if (fs.existsSync(pathUpload)) {
                return response.status(400).json({message: "file already exist!"})
            }

            //
            file.mv(pathUpload)

            const type = file.name.split('.').pop()

            //
            const dbFile = new File({
                name: file.name,
                type,
                size:file.size,
                path: pathUpload,
                // parent: parent?._id,
                user:user._id
            })

            await dbFile.save()
            await user.save()

            response.json(dbFile)
        } catch (error) {
            return response.status(400).json({message:"Upload error!"})
        }
    }

    async uploadFolder(request, response) {
        try {
            const {name, type, parent} = request.body
            console.log('request.body =', request.body);
            //
            const creatingFile = new File({name, type, parent, user:request.user.id})

               
            creatingFile.path = name
            await FileService.createDir(request, creatingFile)
            await UploadFiles(creatingFile)
        
            await creatingFile.save()

            return response.json(creatingFile)
            
        } catch (error) {
            console.log('error block');
            return response.status(400).json(error)
        }
    }
}

module.exports = new FileController()