const Yup = require('yup');
const Module = require('../Models/Module');
const ModuleLesson = require('../Models/ModuleLesson');

class ModuleController {

    async index(req, res) {
        const { limit = 5 } = req.params;
        const { page = 1 } = req.params;
        const options = { limit, page };
        const query = {};
        await Module.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    module: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar modulos"
                })
            })
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            number: Yup.string().required(),
            tools: Yup.string().required(),
            slug: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const module = await Module.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Modulo não foi cadastrado!"
            });

            return res.status(200).json({
                error: false,
                message: "Modulo cadastrado com sucesso!",
                dados: module
            })
        });
    };

    async delete(req, res) {
        const moduleExist = await Module.findOne({ _id: req.params.id });

        if (!moduleExist) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Modulo não encontrado"
            });
        };

        const module = await Module.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Modulo não foi apagado com sucesso!"
            });
        });

        const moduleLesson = await ModuleLesson.deleteMany({ module_id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Modulo não foi apagado com sucesso!"
            });
        })

        return res.json({
            error: false,
            message: "Module apagado com sucesso!"
        });
    };
}

module.exports = new ModuleController();