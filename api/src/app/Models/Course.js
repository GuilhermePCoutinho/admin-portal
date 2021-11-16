const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Course = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    number: { type: Number, required: true }
},
{
    timestamps: true,
});

Course.plugin(mongoosePaginate);

module.exports = mongoose.model('course', Course);

