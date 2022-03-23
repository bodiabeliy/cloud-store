const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcrypt")
const {check, validationResult} = require("express-validator")

const authRouter = new Router()

authRouter.post('/registration', 

// проверка валидации папроля и почты на валидность
[
    check("email", "Email is uncorrect!").isEmail(),
    check("password", "Password is uncorrect! (Length must be in range from 3 to 12 symbols)").isLength({min:3, max:12})
],
async (request, responce ) => {
    try {
        const errors = validationResult(request)

        //получаем данные из тела запроса
        const {email, password} = request.body

        // проверка наличия ошибок в запросе

        if (!errors.isEmpty()) {
            return responce.status(400).json({massege: `Uncorrect request: ${errors}`})
        }

        const person = await User.findOne({email}) // есть ли пользователь по ключу email
        
        if (person) {
            return responce.status(400).json({massege: `user with ${email} already exist!`})
        }
        const  passwordHash = await bcrypt.hash(password, 15)
        const createUser = new User({email, password:passwordHash})
        await createUser.save()
            return responce.json({massege: "User was creared successfully!"})
        
    } catch (error) {
        responce.send({message: `Server error ${error}`})
    }
})

module.exports = authRouter