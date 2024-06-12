const mongoose=require('mongoose');
const toDoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    list:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('toDo', toDoSchema,'toDo');