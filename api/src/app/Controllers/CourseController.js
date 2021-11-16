const Yup = require('yup');
const Course = require('../Models/Course');

class CourseController {

    async index(req, res) {
        const { limit = 10 } = req.params;
        const { page = 1 } = req.params;
        const options = { limit, page, sort: { number: 1 }, select: 'title description slug type style url' };
        const query = {  };
        await Course.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    courses: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar cursos"
                })
            })
    }

    async show(req, res) {

        const { limit = 1, course } = req.params;
        const options = { limit, populate: "course_id" };
        const query = { course_id: course };
        await ModuleLesson.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    course: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar curso"
                })
            })

    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            slug: Yup.string().required(),
            type: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const course = await Course.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Modulo não foi cadastrado!"
            });

            return res.status(200).json({
                error: false,
                message: "Modulo cadastrado com sucesso!",
                dados: course
            })
        });
    };

    async delete(req, res) {
        const courseExist = await Course.findOne({ _id: req.params.id });

        if (!courseExist) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Curso não encontrado"
            });
        };

        const course = await Course.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Curso não foi apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Curso apagado com sucesso!"
        });
    };
}

module.exports = new CourseController();