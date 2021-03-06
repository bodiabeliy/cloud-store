const express = require("express")
const cors = require('cors')
const mogoose = require("mongoose")
const config  = require("config")
const authRouter = require("./routes/authorization")
const fileRouter = require("./routes/files")
const fileUpload = require("express-fileupload")
const path = require("path")
const filePathMiddleware = require("./middlware/index")
const app = express()

//
app.use(filePathMiddleware(path.resolve(__dirname, "files")))
app.use(fileUpload({}))

// прослойка для передачи запросов на все домены
app.use(cors({
    origin: '*',
    allowedHeaders:'*'
}));

app.use(express.json())

//маршуты

app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)



const PORT = process.env.PORT || config.get("ServerPort")
const serverStart = async () => {
    try {
        // подключение к БД monoose
        mogoose.connect(config.get("DataBaseURL"))


        // для запуска сервера (по порту с соответствующим действием)
        app.listen(PORT, () => {
            console.log(`Server was started on ${PORT}`);
        })
        
        
    } catch (e) {
        
    }
}
serverStart()