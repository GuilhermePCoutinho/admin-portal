const { Router } = require('express');

//Middleware
const authMiddleware = require('./app/Midlewares/auth');

//Controllers
const UserController = require('./app/Controllers/UserController');
const LoginController = require('./app/Controllers/LoginController');
const CourseController = require('./app/Controllers/CourseController');
const ModuleController = require('./app/Controllers/ModuleController');
const LessonController = require('./app/Controllers/LessonController');
const ModuleLessonController = require('./app/Controllers/ModuleLessonController');
const ModuleCourseController = require('./app/Controllers/ModuleCourseController');

const routes = new Router();

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.get('/user-courses', authMiddleware, UserController.access);

routes.post('/signin', LoginController.index);

routes.get('/courses', authMiddleware, CourseController.index);
routes.post('/course', authMiddleware, CourseController.store);
routes.get('/course/:course', authMiddleware, CourseController.show);
routes.delete('/course/:id', authMiddleware, CourseController.delete);

routes.post('/module', authMiddleware, ModuleController.store);
routes.get('/modules', authMiddleware, ModuleController.index);
routes.delete('/module/:id', authMiddleware, ModuleController.delete);

routes.post('/lesson', authMiddleware, LessonController.store);
routes.get('/lessons', authMiddleware, LessonController.index);
routes.get('/lesson/:slug', authMiddleware, ModuleLessonController.show);
routes.delete('/lesson/:id', authMiddleware, LessonController.delete);

routes.post('/module-lesson', authMiddleware, ModuleLessonController.store);
routes.get('/lessons-module/:slug', authMiddleware, ModuleLessonController.index);
routes.delete('/module-lesson/:id', authMiddleware, ModuleLessonController.delete);

routes.post('/module-course', authMiddleware, ModuleCourseController.store);
routes.get('/modules-course/:slug', authMiddleware, ModuleCourseController.modulesCourse);

module.exports = routes;