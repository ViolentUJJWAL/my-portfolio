const user = require("../models/userModels")
const skill = require("../models/skillModels")
const education = require("../models/educationModels")
const experience = require("../models/experienceModels")
const project = require("../models/projectModels")
const { comparePassword, hashPassword } = require("../utils/password")



exports.updateUser = async (req, res) => {
    try {
        const { name, phoneno, about, designation, city, state, country, pin } = req.body
        const { resume, profilrImage, logo } = req.file
        console.log(req.file)
        const userdata = await user.findById(req.user._id)
        userdata.name = name || userdata.name
        userdata.phoneno = phoneno || userdata.phoneno
        userdata.about = about || userdata.about
        userdata.designation = designation.split(",") || userdata.designation
        userdata.address.city = city || userdata.address.city || null
        userdata.address.state = state || userdata.address.state || null
        userdata.address.country = country || userdata.address.country || null
        userdata.address.pin = pin || userdata.address.pin || null

        if (resume) {
            const uploadResponse = await uploadOnCloudinary(resume[0].path);
            console.log("uploadResponse", uploadResponse);
            if (!uploadResponse) {
                throw new Error("Failed to upload image on cloudinary");
            }
            userdata.resume = {
                url: uploadResponse.url,
                public_id: uploadResponse.public_id
            };
        }
        if (profilrImage) {
            const uploadResponse = await uploadOnCloudinary(profilrImage[0].path);
            console.log("uploadResponse", uploadResponse);
            if (!uploadResponse) {
                throw new Error("Failed to upload image on cloudinary");
            }
            userdata.resume = {
                url: uploadResponse.url,
                public_id: uploadResponse.public_id
            };
        }
        if (logo) {
            const uploadResponse = await uploadOnCloudinary(logo[0].path);
            console.log("uploadResponse", uploadResponse);
            if (!uploadResponse) {
                throw new Error("Failed to upload image on cloudinary");
            }
            userdata.resume = {
                url: uploadResponse.url,
                public_id: uploadResponse.public_id
            };
        }

        await userdata.save()
        return res.status(200).send({ message: "user data is updated", data: userdata })
    } catch (error) {
        console.log(error.message)
        return res.status(400).send({ error: error.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userdata = await user.findById(req.user._id)
        return res.status(200).send({ message: "get user data", data: userdata })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const userdata = await user.findOne({ username: req.params.username })
        if (!userProfile) {
            return res.status(404).send({ error: "user not found" })
        }
        const skilldata = await skill.find({ userId: userdata._id })
        const educationdata = await education.find({ userId: userdata._id })
        const experiencedata = await experience.find({ userId: userdata._id })
        const projectdata = await project.find({ userId: userdata._id })
        if (!userdata.about || userdata.designation.length === 0 || !userdata.address || educationdata.length === 0 || skilldata.length === 0) {
            return res.status(400).send({ error: "user not enter full information or at least one education and skill data" })
        }
        return res.status(200).send({
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
        return res.status(500).send({ error: error.message })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).send({ error: "please fill all field" })
        }
        const userdata = user.findById(req.user._id).select("+password")
        if (!(await comparePassword(oldPassword, userdata.password))) {
            return res.status(400).send({ message: "Wrong password" })
        }
        const encryptpassword = await hashPassword(newPassword)
        if (!encryptpassword) {
            return res.status(500).send({ error: "password not encrypted function failed" })
        }
        userdata.password = encryptpassword
        await userdata.save()
        return res.status(200).send({ message: "Password changed successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}