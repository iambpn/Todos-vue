const {todoService} = require("../../services");

let todoController = {
    getAll: async (req, res, next) => {
        try {
            const tasks = await todoService.getAll();
            res.json(tasks);
        } catch (e) {
            res.status(500).json({message: e.message || "Failed to fetch data from server."});
        }
    },
    add: async (req, res, next) => {
        try {
            const {content} = req.body;
            const task = await todoService.add({content});
            res.json(task);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message || "Server Error"});
        }
    },
    updateCompleted: async (req, res, next) => {
        try {
            const {id, updateData} = req.body;
            await todoService.update(id, {
                completed: updateData.completed
            })
            res.json({message: "Todo Updated."});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message || "Error while updating database."});
        }
    },
    delete: async (req, res, next) => {
        try {
            const {id} = req.body;
            await todoService.delete(id);
            res.json({message: "Todo Deleted."});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message || "Error while updating database."});
        }
    }
}

module.exports = todoController;