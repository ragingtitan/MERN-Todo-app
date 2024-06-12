const {Router}=require('express');
const {getToDo,saveToDo,updateToDo,deleteToDo,getCollection,updateStateToDo} = require('../controllers/toDoController');

const router = Router();
router.get('/',getToDo);
router.post('/add',saveToDo);
router.post('/updatestate',updateStateToDo);
router.post('/delete',deleteToDo);
router.post('/update',updateToDo);
module.exports = router;