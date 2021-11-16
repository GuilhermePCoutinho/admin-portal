const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Lesson = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    number: { type: Number, required: true },
    video: { type: String, required: false },
    slug: { type: String, required: true },
    type: { type: Number, required: true }
},
{
    timestamps: true,
});

Lesson.plugin(mongoosePaginate);

module.exports = mongoose.model('lesson', Lesson);

