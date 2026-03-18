const db = require("../configure/db")
exports.login=async(req,res)=>{

    try{
            const {email,password} = req.body;

            const [results] =await db.execute("select * from users where email = ? and password = ?",[email,password]);
            if(results.length===0){
                res.status(501).json([])
            }
            console.log(`the result is email:${results[0].email}`);
            
            
            req.session.user={
                id:results[0].id,
                name:results[0].name
            }
          return  res.status(200).json({msg:true,msg2:"done"})
    }
    catch(e){
        console.log("error in catch of login")
      return  res.status(501).json({msg: `error in hoohae catch ${e}`})
    }
}

exports.signup=async(req,res)=>{
    try{
        const {names,email,password} = req.body;
        const resps = await db.execute("insert into users(name,email,password) values(?,?,?)",[names,email,password]);
        if(resps){
            const [resp]= await db.execute("select * from users where email=? and password =?",[email,password])
        
        req.session.user={
            id:resp[0].id,
            name:resp[0].name

        }}
        console.log("done and dusted");
        
        return res.json({msgs3:true})
    }
    catch(e){
        return res.json({msg:`error in the try catch ${e}`})
    }
}