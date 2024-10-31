const bcrypt = require("bcryptjs")

const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT)); // Generate a salt
        const hash = await bcrypt.hash(password, salt); // Hash the password
        return hash;
    }catch(err){
        console.log(err)
        return false
    }
};

const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch(err) {
        console.log(err);
        return false;
    }
};

module.exports = {hashPassword, comparePassword}