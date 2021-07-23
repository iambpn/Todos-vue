const {tasks} = require("../models");

module.exports = {
    add: async (content) => {
        const task = await tasks.create(content);
        return task;
    },
    update: async (uuid, updateData) => {
        const task = await tasks.update(updateData, {
            where: {uuid}
        });
        return task;
    },
    getAll: async () => {
        const allTasks = await tasks.findAll();
        return allTasks;
    },
    delete: async (uuid) => {
        await tasks.destroy({
            where: {uuid}
        })
        return true;
    }
}