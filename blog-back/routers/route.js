const express = require("express")
const route = express.Router()
const {auths } = require("../middleware/auth")
const {upload } = require("../middleware/multerconf")
const {login,signup} = require("../controllers/login")
const { addposts , deletepost,updateposts} = require("../controllers/post_crud")
const {dashboards , getsingleid} = require("../controllers/dashboard")
const {allposts, getsingle ,allusers} =require("../controllers/view")
const {logout} = require("../controllers/logout")
const { addListener } = require("../configure/db")

// login & sign 
route.post("/login",login)
route.post("/signup",signup)
route.post("/logout",logout)


// posts route 
route.post("/addposts",upload.single("p_img"),addposts)
route.get("/allposts",allposts)
route.get("/allusers",allusers)

// dashboard
route.get("/dash",auths,dashboards)
route.get("/postbyid/:ids",getsingleid)
route.get("/post/:id",getsingle)
route.delete("/deletepost/:id",deletepost)
route.put("/updatepost/:id",updateposts)

module.exports = route;