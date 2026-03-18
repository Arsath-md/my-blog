require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./configure/db");
const cors = require("cors");
const session = require("express-session");

const routing = require("./routers/route")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:"vippi",
    resave:false,
    saveUninitialized:false,
    cookie:{
         maxAge: 1000 * 60 * 60,
    sameSite: "lax",   // important
    secure: false
    }
}
))
app.use("/uploads",express.static("uploads"))
app.use("/",routing);


app.listen(3000,console.log(`the port is running in the 3000`)
)