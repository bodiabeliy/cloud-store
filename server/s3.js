
require("dotenv").config()
const s3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME 
const region = process.env.AWS_REGION
const accessKey = process.env.AWS_ACCSSES_KEY
const secretKey = process.env.AWS_SECRET_KEY

// объект настроек конфигурации доступа (регион и учетные данные)
const s3_Config = new s3({
    region,
    credentials: {
        accessKeyId:accessKey,
        secretAccessKey:secretKey
    }
})

   

// функция загрузки на платформу
 async function UploadFiles(files) {
    await s3_Config.putObject({
        Bucket: bucketName,
        Body: files.name,
        Key:files.name
    }).promise()
}

module.exports.UploadFiles = UploadFiles
// функция скачивания из платформы

 function DownloadFiles() {

}

