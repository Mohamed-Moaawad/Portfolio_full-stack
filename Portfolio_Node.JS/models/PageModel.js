const mongoose = require('mongoose');

const Section = require('./SectionModel');

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    Sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }],
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
