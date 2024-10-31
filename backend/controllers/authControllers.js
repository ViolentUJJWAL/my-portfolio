const User = require("../models/userModels")
const { hashPassword, comparePassword } = require("../utils/password")


const generateToken = (id, res) => {
    console.log("id", id);
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
        const encryptpassword = await hashPassword(password)
        if (!encryptpassword) {
            return res.status(500).send({ error: "password not encrypted function failed" })
        }
        const userdata = await User.create({ name, username, email, password: encryptpassword, phoneno })
        if (!userdata) {
            return res.status(201).send({ message: "Sign up successfully" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(400).send({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if ((!username && !email) || !password) {
            return res.status(400).send({ error: "please fill all field" })
        }
        const userdata = User.findOne({
            $or: [
                { email },
                { username }
            ]
        }).select("+password")
        if(!userdata){
            return res.status(400).send({error: "invalid credentials"})
        }
        const chackPassword = await comparePassword(password, userdata.password)
        if(!chackPassword){
            return res.status(400).send({error: "invalid credentials"})
        }
        await generateToken(userdata._id, res)
        return res.status(200).send({message: "Loged in successfully", data: userdata})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}

exports.logout = async(req, res)=>{
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        return res.status(200).send({message: "Logout successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ error: error.message })
    }
}