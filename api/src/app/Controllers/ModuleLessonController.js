const Yup = require('yup');
const ModuleLesson = require('../Models/ModuleLesson');
const Lesson = require('../Models/Lesson');
const Course = require('../Models/Course');
const Module = require('../Models/Module');

class ModuleLessonController {

    async index(req, res) {
        const module = await Module.findOne({ slug: req.params.slug });

        if (!module) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível encontrar esse modulo!"
            })
        }

        const { limit = 50 } = req.params;
        const { page = 1 } = req.params;
        const options = { limit, page, populate: "lesson_id" };
        const query = { module_id: module };
        await ModuleLesson.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    lessons: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar aulas!"
                })
            })
    }

    async modulesCourse(req, res){
        const courseData = await Course.findOne({ slug: req.params.slug })

        if (!courseData) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível encontrar esse curso!"
            })
        }

        const { limit = 50 } = req.params;
        const { page = 1 } = req.params;
        const options = { limit, page, populate: "module_id"};
        const query = { course_id: courseData._id };
        await ModuleLesson.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    modules: response,
                    courseData
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar serviços"
                })
            })
    }

    async show(req, res) {
        const lesson = await Lesson.findOne({ slug: req.params.slug })

        if (!lesson) {
            return res.status(400).json({
                error: true,
                message: "Não foi possível encontrar essa aula!"
            })
        }

        const options = { populate: "lesson_id" };
        const query = { lesson_id: lesson._id };
        await ModuleLesson.paginate(query, options)
            .then((response) => {
                return res.status(200).json({
                    error: true,
                    lesson: response
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    message: "Falha ao encontrar aula"
                })
            })

    }

    async store(req, res) {
        const schema = Yup.object().shape({
            module_id: Yup.string().required(),
            lesson_id: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        var dados = req.body;

        const lesson = await ModuleLesson.create(dados, (err) => {
            if (err)
                return res.status(400).json({
                    error: true,
                    code: 101,
                    message: "Error: Aula não foi cadastrada!"
                });

            return res.status(200).json({
                error: false,
                message: "Aula cadastrada!",
                dados: lesson
            })
        });
    };

    async delete(req, res) {
        const lessonExist = await ModuleLesson.findOne({ lesson_id: req.params.id });

        if (!lessonExist) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: AUla não encontrada"
            });
        };

        const lesson = await ModuleLesson.deleteOne({ lesson_id: req.params.id }, (err) => {
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

module.exports = new ModuleLessonController();