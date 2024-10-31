const user = require("../models/userModels")

exports.blockUser = async(req,res)=>{
    try {
        const userdata = await user.findById(req.params.id)
        if(!userdata){
            return res.status(404).send({message: "user not found"})
        }
        if(userdata.role !== "admin"){
            return res.status(403).send({error: "you can not blocked admin"})
        }
        userdata.isActive = !userdata.isActive
        await userdata.save()
        return res.status(200).send({message: `${userdata.username} is ${(userdata.isActive)?"unblocked": "blocked"}`})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}

exports.getAlluser = async(req,res)=>{
    try {
        const data = await user.find()
        return res.status(200).send({message: "get all user data", data})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}