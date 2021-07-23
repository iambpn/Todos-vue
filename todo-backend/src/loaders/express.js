const express = require("express");
const cors = require("cors");

let expressLoader = {
    inti: (app) => {
        // configure all the global middleware
        app.use(cors())
        app.use(express.json());

        require("../routes")(app);

        return app;
    }
}

module.exports = expressLoader;
