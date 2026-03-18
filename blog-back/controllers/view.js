const db = require("../configure/db")

exports.allposts = async(req , res)=>{
  // const ids = req.user.id;
  try{
    const [allpost] =await db.execute("select * from users inner join posts on users.id = posts.u_id ")
    if(allpost){
      return res.status(200).json(allpost)
    }

  }
  catch(e){
      res.status(500).json({msg:`error occued in ${e}`});
      console.log("error in the try block "+ e)
  }
}

exports.getsingle = async (req,res)=>{
  try{
    const {id} = req.params

    const [result] = await db.execute(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    )

    if(result.length === 0){
      return res.status(404).json({msg:"Post not found"})
    }

    return res.json(result[0])

  }catch(e){
    res.status(500).json({msg:e})
  }
}

exports.allusers = async(req ,res) =>{
  try{
   const [allusers] =await db.execute("select users.id, users.name, count(posts.id) as post_count from users inner join posts on  users.id= posts.u_id group by users.id")
   if(allusers){
    console.log("data from all users api");
    
    return res.json(allusers)
   }


  }catch(e){
    console.log("error in the all users api"+e)
    res.status(501).json({msg:"error in all users api"})
  }

}