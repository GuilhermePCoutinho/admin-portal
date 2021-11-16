const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ModuleLesson = new mongoose.Schema({
    module_id: { type: mongoose.Schema.Types.ObjectId, ref: "module", required: true },
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: "lesson", required: true }
},
{
    timestamps: true,
});

ModuleLesson.plugin(mongoosePaginate);

module.exports = mongoose.model('module-lesson', ModuleLesson);

