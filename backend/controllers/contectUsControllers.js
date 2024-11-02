const ContactUs = require("../models/contactUsModels")

exports.getAllContactUs = async (req, res) => {
    try {
        const user = req.user
        const userId = user._id
        if(user.role === "admin"){
            userId = null
        }
        const contactUsData = await ContactUs.find({ userId })
        return res.status(200).json({ message: "get all contactus data", data: contactUsData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to retrieve Contact us data.'});
    }
}

exports.ceateContectUs = async(req,res)=>{
    try {
        const {name, email, phone, subject, message, userId} = req.body
        const contactUsData = await ContactUs.create({
            name,
            email,
            phone,
            subject,
            message,
            userId: userId || null
        })
        return res.status(200).json({message: "contactUs message send", data: contactUsData})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

exports.deleteContactUs = async (req,res) =>{
    try {
        const { id } = req.params
        const contactUsData = ContactUs.findById(id)
        if(!contactUsData || !(contactUsData.userId.equal(req.user._id))) return res.status(404).json({error: "ContactUs entry not found or access denied."});
        await ContactUs.findByIdAndDelete(contactUsData._id);
        return res.status(200).json({message: "Contactus data deleted", data: contactUsData})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message});
    }
}