const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ModuleCourse = new mongoose.Schema({
    module_id: { type: mongoose.Schema.Types.ObjectId, ref: "module", required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true }
},
{
    timestamps: true,
});

ModuleCourse.plugin(mongoosePaginate);

module.exports = mongoose.model('module-course', ModuleCourse);

