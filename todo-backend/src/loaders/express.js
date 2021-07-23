const express = require("express");
const cors = require("cors");
const path = require("path");

let expressLoader = {
    inti: (app) => {
        // configure all the global middleware
        app.use(cors())
        app.use(express.json());

        // app.use(express.static(path.join(process.cwd(), '../todo-frontend/dist')));
        app.use(express.static(path.join(__dirname, '../../../todo-frontend/dist')));

        require("../routes")(app);

        return app;
    }
}

module.exports = expressLoader;
