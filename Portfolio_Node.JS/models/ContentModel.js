const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    title: {
        type: String,
        
    },
    type:{
        type:String,
        enum: ['text', 'image', 'card', 'video', 'list', 'custom' , 'header','paragraph','header_paragraph'],
    },
    data:{
        type: mongoose.Schema.Types.Mixed
    },
}); 

const Content = mongoose.model('Content',ContentSchema);

module.exports = Content;