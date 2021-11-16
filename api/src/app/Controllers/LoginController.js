const Yup = require('yup');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const configAuth = require('../../config/auth');
const jwt = require('jsonwebtoken');

class LoginController {

    async index(req, res) {
        const { email, password } = req.body;

        const userExiste = await User.findOne({ email: email });

        if(!userExiste){
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Erro: Usuário não encontrado!"
            })
        }

        if(! (await bcrypt.compare(password, userExiste.password))){
            return res.status(401).json({
                error: true,
                code: 111,
                message: "Erro: Senha inválida!"
            })
        }

        return res.json({
            user: {
                name: userExiste.name,
                email,
                access:userExiste.courses
            },
            token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn: configAuth.expiresIn}),
        })
       
    }
}

module.exports = new LoginController();