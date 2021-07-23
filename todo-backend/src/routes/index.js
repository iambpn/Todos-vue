const todoRoutes = require("./api/todoRoutes");
const path = require("path");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, '../../../todo-frontend/dist/index.html'));
    })

    // linking routes syntax: app.use(PATH,MIDDLEWARE(eg. Authentication),Routes)
    app.use('/api', [], todoRoutes);
}