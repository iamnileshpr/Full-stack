const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

app.use(express.json()) //to handle form data 
app.use(express.urlencoded({ //to handle form data
    extended: true
}))

async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bcrypt')
        console.log("Database connected");
    } catch (err) {
        console.log("DB Error:", err);
    }
}
connectDb();

let userSchema = mongoose.Schema({
    name: String,
    password: String
})

let User = mongoose.model('User', userSchema)

app.get('/', function(req, res) {
    res.send("sever chal raha hai")
})

app.post('/register', async function(req, res) { //since this is not part of js hence we use async await
    console.log(req.body);
    let data = req.body; //getting data form user and it always store in body
    let salt = await bcrypt.genSalt(10);
    let bcryptHash = await bcrypt.hash(data.password, salt);

    let user = await User.create({ //model me data fill karna 
        name: data.name,
        password: bcryptHash //data.password,
    })
    res.json({
        message: "successfull",
        user: user
    })
})
app.post('/login', async function(req, res) { //to check for password comparison using login page
    let data = req.body

    let user = await User.findOne({ name: data.name })

    let isme = await bcrypt.compare(data.password, user.password)
    if (!isme) {
        return res.json({
            message: "invalid credential"
        })
    }
    res.json({
        message: "user logged in successfully",
        user: user
    })
    res.json({
        message: "User logged in successfully",
        user: user
    })
})



app.listen(3000, () => {
    console.log("sever running")
})