const sequelize_con_loader = require("./sequelize_con");
const expressLoader = require("./express");

module.exports = {
    inti: async (app) => {
        await sequelize_con_loader.init();
        await expressLoader.inti(app);
    }
}