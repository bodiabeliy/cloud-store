const express = require("express")
const mogoose = require("mongoose")
const config  = require("config")


const app = express()
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