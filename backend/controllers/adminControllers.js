const user = require("../models/userModels")

exports.blockUser = async(req,res)=>{
    try {
        const userdata = await user.findById(req.params.id)
        if(!userdata){
            return res.status(404).json({message: "user not found"})
        }
        if(userdata.role === "admin"){
            return res.status(403).json({error: "you can not blocked admin"})
        }
        userdata.isActive = !userdata.isActive
        await userdata.save()
        return res.status(200).json({message: `${userdata.username} are ${(userdata.isActive)?"unblocked": "blocked"}`})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

exports.getAlluser = async(req,res)=>{
    try {
        const data = await user.find()
        return res.status(200).json({message: "get all user data", data})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}