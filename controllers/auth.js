const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // пользователь существует, проверяем пароль
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            // пароль верный, генерируем токен
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})

            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Пароль не верен'})
        }
    } else {
        res.status(404).json({message: 'Пользователь с таким email не найден'})
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // если пользователь существует
        res.status(409).json({email: 'Такой email уже занят'})
    } else {
        // создаем пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}
