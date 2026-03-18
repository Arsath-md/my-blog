
const auths = (req,res,next)=>{

    if(req.session.user){
        next()
    }
    else{
        res.status(401).json({msg:false})
    }
}
module.exports ={auths}