const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Module = new mongoose.Schema({
    title: { type: String, required: true },
    number: { type: String, required: true },
    description: { type: String, required: false },
    tools: { type: String, required: true },
    slug: { type: String, required: true }
},
{
    timestamps: true,
});

Module.plugin(mongoosePaginate);

module.exports = mongoose.model('module', Module);

