let express = require("express")
let app = express();
let cors = require("cors")


app.use(cors()); //use for frontend and backend connection


app.get("/", function(req, res) {
    res.json({
        succes: true,
        message: " hello world"
    })
})

app.listen(3000, function(req, res) {
    console.log("server chalu ho gaya");
})