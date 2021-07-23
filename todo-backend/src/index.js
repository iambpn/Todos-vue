const express = require("express");
const loader = require("./loaders");

let port = 3000;

(async () => {
    let app = express();

    await loader.inti(app);

    let server = app.listen(port, (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("Express Server Running on port :" + port);
    })
})();