const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    course: { type: String, required: false },
    font: { type: String, required: false },
    vid: { type: String, required: false },
    ocupation: { type: String, required: false },
    company: { type: String, required: false },
    courses: { type: Array, required: false }
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('user', User);

