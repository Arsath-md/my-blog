const db = require("../configure/db")

exports.dashboards =async (req,res)=>{
    try{
            const idm= req.session.user.id;
            console.log(idm);
            
            const [inserting] =await db.execute("select * from posts where u_id= ?",[idm]);
            if(inserting.length == 0){
              return res.json({msg:"nothing found"})
            }
            console.log(inserting);
            
           return res.json(inserting)

    }
    catch(e){
     return  res.status(401).json({msg:`there is no session in try block ${e}`})
        }

}


exports.getsingleid = async(req ,res) =>{
    const {id} = req.session.user;
    const {ids} = req.params;
    try{
      const [getbyid] = await db.execute("select * from posts where u_id = ? and id = ?",[id , ids])
      if(!getbyid){
        console.log("error while handling");
      }
      console.log("success to get the single item from dash ");
      
        return res.json(getbyid[0])

    }catch(e){
      console.error("have a error in the get single item by personal"+e)
      res.json({msg:false})
    }

}