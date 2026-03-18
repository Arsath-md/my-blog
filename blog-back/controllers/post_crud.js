const db = require("../configure/db")



exports.addposts = async(req , res) =>{
  
  
  const {p_name , p_desc , p_content} = req.body;
  const p_img = req.file ? req.file.filename : null 
 const {id} = req.session.user;
  console.log(id)
  console.log(req.body)
console.log(req.file)

  try{
   const [adding] = await db.execute(
     "insert into posts(p_name,p_desc,p_content,img,u_id) values (?,?,?,?,?)",
     [p_name ,p_desc, p_content, p_img , id]
   );
    if(adding){
            console.log("done");
     return res.status(200).json({msg:true} )
        }
  }
  catch(e){
     console.log("the error is :"+ e);
     
      res.status(500).json({msg:`have error in head `})
  }
}

exports.deletepost=async(req,res)=>{
    const {id} = req.params
    try{
        const dltpost = await db.execute("delete from posts where id = ? ",[id])
       if(dltpost.affectedRows === 0){
            return res.status(404).json({msg:false})
        }

        return res.status(200).json({msg:true})
    }
    catch(e){
      console.log(`the errror in the dlete post ${e}`)
    }

}

exports.updateposts = async(req, res)=>{

  const {id} = req.params
  const {p_name , p_desc ,p_content} = req.body

  try{
    const uptpost = await db.execute("update posts set p_name = ? , p_desc = ? , p_content = ? , create_at = now() where id = ?" , [p_name,p_desc,p_content,id])
    if(uptpost.affectedRows === 0){
      return res.status(404).json({msg:"no update happened"})
    }
    res.status(200).json({msg:true})

  }
  catch(e){
        console.error(`there is a error in catch of update post ${e}`)
  }
}