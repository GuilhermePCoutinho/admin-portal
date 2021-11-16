const Yup = require('yup');
const Lesson = require('../Models/Lesson');

class LessonController {

    async index(req, res) {
        const { limit = 5 } = req.params;
        const { page = 1 } = req.params;
        const options = { limit, page };
        const query = {};
        await Lesson.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    lesson: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar aulas"
                })
            })
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            number: Yup.number().required(),
            video: Yup.string().required(),
            slug: Yup.string().required(),
            type: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const lesson = await Lesson.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Aula não foi cadastrado!"
            });

            return res.status(200).json({
                error: false,
                message: "Aula cadastrado com sucesso!",
                dados: lesson
            })
        });
    };

    async delete(req, res) {
        const lessonExist = await Lesson.findOne({ _id: req.params.id });

        if (!lessonExist) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Aula não encontrada"
            });
        };

        const lesson = await Lesson.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Aula não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Aula apagado com sucesso!"
        });
    };
}

module.exports = new LessonController();