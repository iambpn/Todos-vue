const {sequelize} = require("../models");
module.exports = {
    init: async () => {
        try {
            await sequelize.authenticate();
            console.log("Connected to Database.");
        } catch (e) {
            console.log("Connection to Database Failed.");
            console.log(e)
        }
    }
}