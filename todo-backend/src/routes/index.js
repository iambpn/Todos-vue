const todoRoutes = require("./api/todoRoutes");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.send("Need to Link Dist index here");
    })

    // linking routes syntax: app.use(PATH,MIDDLEWARE(eg. Authentication),Routes)
    app.use('/api', [], todoRoutes);
}