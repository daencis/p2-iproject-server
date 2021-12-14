const {User} = require("../models/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userRegister = async (req, res, next) =>{
    try{
        const {email, password, name} = req.body
        if(!email || !password || !name) throw {name: "BAD_REQUEST"}

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })

        res.status(201).json(newUser)
    }catch(err){

    }
}

const userLogin = async (req, res, next) =>{
    try{
        const {email, password, name} = req.body
        if(!email || !password || !name) throw {name: "BAD_REQUEST"}

        const userLogin = await User.findOne({
            where:{
                name: name,
                email: email
            }
        })

        const validation = bcrypt.compareSync(userLogin.password, password)
        if(!validation) throw {name: "UNAUTHORIZED"}

        const payload = {
            id: userLogin.id,
            name: userLogin.name
        }

        const access_token = jwt.sign(payload, "sangatsangatrahasia")

        res.user = {
            id: userLogin.id,
            name: userLogin.name
        }

        res.status(200).json({access_token})
    }catch(err){

    }
}

module.exports = { userRegister, userLogin }