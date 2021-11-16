const Yup = require('yup');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

class UserController {

    async access(req, res) {

        let response = await User.findOne({ _id: req.userId }, 'courses');

        if(!response) {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        }

        return res.json({
            error: false,
            courses: response.courses
        });
    }

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 5 } = req.query;
        await User.paginate({}, { select: '_id name email phone', page, limit }).then((users) => {
            return res.json({
                error: false,
                users
            }); 
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        User.findOne({ _id: req.params.id }, '_id name email phone').then((user) => {
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email().required(),
            phone: Yup.string().min(10),
            password: Yup.string().min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;
        dados.password = await bcrypt.hash(dados.password, 8);

        const emailExiste = await User.findOne({ email : dados.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Você já está cadastrado!"
            });
        };

        const user = await User.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado!"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            })
        });
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
            name: Yup.string(),
            email: Yup.string()
                .email(),
            password: Yup.string()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id, email }= req.body;

        const usuarioExiste = await User.findOne({_id: _id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        if(email != usuarioExiste.email){
            const emailExiste = await User.findOne({email});
            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este e-mail já está cadastrado!"
                });
            };
        };

        var dados = req.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: dados._id}, dados, (err) => {
            if(err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });        
    };

    async delete(req, res) {
        const usuarioExiste = await User.findOne({ _id: req.params.id });

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Usuário não encontrado"
            });
        };

        const user = await User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Usuário não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    };
}

module.exports = new UserController();