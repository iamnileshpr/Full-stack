const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

app.use(express.json()) //to handle form data 
app.use(express.urlencoded({ //to handle form data
    extended: true
}))


function checkLogin(req, res, next) {
    let token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.json({
            message: "unauthorized",
        })
    }
    let decoded = jwt.verify(token, "codekipathshala")
    if (!decoded) {
        return res.json({
            message: "invalid token"
        })
    }
    console.log(decoded);
    req.user = decoded
    next();
}

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

app.get('/', checkLogin, function(req, res) {
    res.send(req.user)
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
    let token = jwt.sign({
        id: user._id,
        name: user.name
    }, 'codekipathshala')

    res.json({
        message: "successfull",
        user: user,
        token: token
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

    let token = jwt.sign({
        id: user._id,
        name: user.name
    }, 'codekipathshala', {
        expiresIn: '1h'
    })
    res.json({
        message: "user logged in successfully",
        user: user,
        token: token
    })
})



app.listen(3000, () => {
    console.log("sever running")
})