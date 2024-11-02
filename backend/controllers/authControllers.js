const User = require("../models/userModels")
const { hashPassword, comparePassword } = require("../utils/password")
const jwt = require("jsonwebtoken")


const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '1d' });
    const expirationTime = 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
        maxAge: expirationTime,
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    console.log("token " + token)
    return token;
};

exports.signup = async (req, res) => {
    try {
        const { name, username, email, password, phoneno } = req.body
        if(!name || !username || !email || !password || !phoneno){
            return res.status(400).json({error: "Please fill all field"})
        }
        if(await User.findOne({email})) return res.status(400).json({error: "email already exist"})
        if(await User.findOne({username})) return res.status(400).json({error: "enter unique username"})
        const encryptpassword = await hashPassword(password)
        if (!encryptpassword) {
            return res.status(500).json({ error: "password not encrypted function failed" })
        }
        const userdata = await User.create({ name, username, email, password: encryptpassword, phoneno })
        return res.status(201).json({ message: "Sign up successfully" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body
        if ((!usernameOrEmail) || !password) {
            return res.status(400).json({ error: "please fill all field" })
        }
        const userdata = await User.findOne({
            $or: [
                { email:  usernameOrEmail},
                { username: usernameOrEmail}
            ]
        }).select("+password")
        if(!userdata){
            return res.status(400).json({error: "invalid credentials"})
        }
        if (!userdata.isActive) {
            return res.status(403).send({
              message:
                "Your account has been blocked. Please contact the administrator.",
            });
          }
        const chackPassword = await comparePassword(password, userdata.password)
        if(!chackPassword){
            return res.status(400).json({error: "invalid credentials"})
        }
        await generateToken(userdata._id, res)
        return res.status(200).json({message: "Loged in successfully", data: userdata})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

exports.logout = async(req, res)=>{
    try {
        if(!req.cookies.token) return res.status(400).json({error: "you are not login"})
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        return res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log(error.message)
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}