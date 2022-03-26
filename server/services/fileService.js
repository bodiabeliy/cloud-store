const fs = require("fs") // работа с файловой системой
const config  = require("config")

const File = require("../models/File")


class FileService {

    // ф-я создания папок
    createDir(file) {

        // создание пути  для файла (путь к домашей папке\имя пользователя\относительный путь)
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        alert(filePath)
        return new Promise((resolve, reject) => {
            try {
                
                // если нет папки
                if (!fs.existsSync(filePath)) {
                    fs.mkdir(filePath, { recursive: true })
                   return resolve({message: "Folder was createsd successfully!"})
                }
                else {
                    return reject({message: "folder already exist!"})
                }
                
            } catch (error) {
                return reject({message: "File creating error!"})
            }
        })
    }

}

module.exports = FileService