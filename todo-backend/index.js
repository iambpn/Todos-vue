const express  = require("express");
const cors = require("cors");

let app = express();
let port = 3000;

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Need to Link Dist index here");
})

app.post("/api/addTodo",(req,res)=>{
    try {
        const {content} = req.body;
        res.json({content, id: 10,completed:false})
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
})

let server = app.listen(port,()=>{
    console.log("Express Server Running on port :"+port);
})