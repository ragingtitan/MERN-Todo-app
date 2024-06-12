const toDoModel=require('../models/toDoModel');

module.exports.getToDo=async(req, res)=>{
    const toDos=await toDoModel.find();
    res.json(toDos);
}
module.exports.saveToDo=async(req, res)=>{
    const {text,list}=req.body;
toDoModel.create({text:text,list:list}).then((data)=>{
    console.log(data);
    res.send(data);
});
  
}
module.exports.updateToDo=async(req, res)=>{
    const {_id,text}=req.body;
    toDoModel.findByIdAndUpdate(_id,{text:text}).then((data)=>{
        console.log(data);
        res.status(201).json({msg:"Updated successfully!"});
    }).catch((err)=>{
        throw err;
    });
}
module.exports.deleteToDo=async(req, res)=>{
    const {_id}=req.body;
    toDoModel.findByIdAndDelete(_id).then((data)=>{
        console.log(data);
        res.status(201).json({msg:"Deleted successfully!"});
    }).catch((err)=>{
        throw err;
    });
}
module.exports.updateStateToDo=async(req, res)=>{
    const {_id,state}=req.body;
    toDoModel.findByIdAndUpdate(_id,{isDone:state}).then((data)=>{
        console.log(data);
        res.status(201).json({msg:"Todo Done!"});
    }).catch((err)=>{
        throw err;
    });
}
