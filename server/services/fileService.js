const fs = require("fs") // работа с файловой системой
const File = require("../models/File")
const config  = require("config")
const path = require('path');



class FileService {

    // ф-я создания папок
    createDir(file) {

        // создание пути  для файла (путь к домашей папке\имя пользователя\относительный путь)
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                
                // если нет папки
                if (!fs.existsSync(filePath)) {
                    fs.mkdir(path.join(filePath, ''),
                    { recursive: true }, (err) => {
                      if (err) {
                        return console.error('error', err);
                      }
                      return resolve('Directory was created successfully!');
                    });
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

module.exports = new FileService()