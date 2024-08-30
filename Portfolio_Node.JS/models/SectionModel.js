const Content = require('./ContentModel');
const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    Contents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
});



const Section = mongoose.model('Section',SectionSchema);

module.exports = Section;
