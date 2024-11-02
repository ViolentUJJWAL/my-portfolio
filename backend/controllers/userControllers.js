const user = require("../models/userModels")
const skill = require("../models/skillModels")
const education = require("../models/educationModels")
const experience = require("../models/experienceModels")
const project = require("../models/projectModels")
const { comparePassword, hashPassword } = require("../utils/password")
const uploadOnCloudinary = require("../utils/cloudinary")
const cloudinary = require('cloudinary').v2;



exports.updateUser = async (req, res) => {
    try {
        const { name, phoneno, about, designation, city, state, country, pin } = req.body
        console.log(req.file)
        const userdata = await user.findById(req.user._id)
        userdata.name = name || userdata.name
        userdata.phoneno = phoneno || userdata.phoneno
        userdata.about = about || userdata.about
        userdata.designation = (designation) ? designation.split(",") : userdata.designation
        userdata.address.city = city || userdata.address.city || null
        userdata.address.state = state || userdata.address.state || null
        userdata.address.country = country || userdata.address.country || null
        userdata.address.pin = pin || userdata.address.pin || null
        await userdata.save()
        return res.status(200).json({ message: "user data is updated", data: userdata })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

exports.uploadfile = async (req, res) => {
    try {
        if (req.file) {
            const { name_file } = req
            const userdata = await user.findById(req.user._id)
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            if (!uploadResponse) {
                throw new Error("Failed to upload image on cloudinary");
            }
            if (userdata.resume.public_id) {
                await cloudinary.uploader.destroy(userdata.resume.public_id);
            }
            if(name_file === "resume"){
                if(userdata.resume.public_id){
                    await cloudinary.uploader.destroy(userdata.resume.public_id);
                }
                userdata.resume = {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id
                };
            }else if(name_file === "profilrImage"){
                if(userdata.profilrImage.public_id){
                    await cloudinary.uploader.destroy(userdata.profilrImage.public_id);
                }
                userdata.profilrImage = {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id
                };
            }else if(name_file === "logo"){
                if(userdata.logo.public_id){
                    await cloudinary.uploader.destroy(userdata.logo.public_id);
                }
                userdata.logo = {
                    url: uploadResponse.url,
                    public_id: uploadResponse.public_id
                };
            }
            await userdata.save()
            return res.status(200).json({message: "file uploaded successefully"})
        }
        return res.status(400).json("select file")
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}


exports.getUser = async (req, res) => {
    try {
        const userdata = await user.findById(req.user._id)
        return res.status(200).json({ message: "get user data", data: userdata })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const userdata = await user.findOne({ username: req.params.username })
        if (!userdata) {
            return res.status(404).json({ error: "user not found" })
        }
        const skilldata = await skill.find({ userId: userdata._id })
        const educationdata = await education.find({ userId: userdata._id })
        const experiencedata = await experience.find({ userId: userdata._id })
        const projectdata = await project.find({ userId: userdata._id })
        if (!userdata.about || userdata.designation.length === 0 || !userdata.address || educationdata.length === 0 || skilldata.length === 0) {
            return res.status(400).json({ error: "user not enter full information or at least one education and skill data" })
        }
        return res.status(200).json({
            message: "get user profile by username",
            data: {
                user: userdata,
                skill: skilldata,
                education: educationdata,
                experience: experiencedata,
                project: projectdata
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "please fill all field" })
        }
        const userdata = await user.findById(req.user._id).select("+password")
        if (!(await comparePassword(oldPassword, userdata.password))) {
            return res.status(400).json({ message: "Wrong password" })
        }
        if (await comparePassword(newPassword, userdata.password)) {
            return res.status(400).json({ message: "New Password is same as old password" })
        }
        const encryptpassword = await hashPassword(newPassword)
        if (!encryptpassword) {
            return res.status(500).json({ error: "password not encrypted function failed" })
        }
        userdata.password = encryptpassword
        await userdata.save()
        return res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

exports.addLink = async(req, res)=>{
    try{
        const {name, url, icon} = req.body
        if(!name || !url || !icon) return res.status(400).json({error: "link name, url and icon is required"});
        const userData = await user.findById(req.user._id)
        userData.link.push({name, url, icon})
        await userData.save()
        return res.status(200).json({message: "Link added successfully"})
    }catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

exports.deleteLink = async(req, res)=>{
    try{
        const {id} = req.params
        if(!id) return res.status(400).json({error: "link id is required"});
        const userData = await user.findById(req.user._id)
        const linkLength = userData.link.length
        if(linkLength === 0) return res.status(400).json({error: "link is empty"});
        userData.link = userData.link.filter((item)=>{
            if(!item._id.equals(id)){
                return item
            }
        })
        await userData.save()
        if(linkLength === userData.link.length) return res.status(400).json({error: "link not found"});
        return res.status(200).json({message: "Link deleted successfully"})
    }catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}