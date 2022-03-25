const express = require("express")
const cors = require('cors')
const mogoose = require("mongoose")
const config  = require("config")
const authRouter = require("./routes/authorization")
// const fileRouter = require("./routes/files")

const app = express()
// прослойка для передачи запросов на все домены
app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.use('/api/auth', authRouter)


const PORT = config.get("ServerPort")
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