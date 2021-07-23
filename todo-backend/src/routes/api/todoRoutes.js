const express = require("express");

const {todoController} = require("../../controller");

const router = express.Router();

//router syntax: router.METHOD(PATH,MIDDLEWARES(eg: validations),CALLBACK)
router.get('/todo', [], todoController.getAll);
router.post('/todo', [], todoController.add);
router.put('/todo/completed', [], todoController.updateCompleted);
router.delete('/todo', [], todoController.delete);

module.exports = router;