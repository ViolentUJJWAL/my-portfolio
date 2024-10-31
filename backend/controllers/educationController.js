const Education = require('../models/educationModels');
const uploadOnCloudinary = require('../utils/cloudinary'); // Import Cloudinary upload function


// Get all education entries for the logged-in user
exports.getUserEducations = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from JWT in middleware
        const educations = await Education.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).send(educations);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Failed to retrieve user education entries.');
    }
}

// Add a new education entry with optional image upload
exports.addEducation = async (req, res) => {
    try {
        const { course, college, location, start, end, status, description } = req.body;
        const userId = req.user.id;

        let imageUrl = null;
        if (req.file) { // Check if image file is provided
            const uploadResponse = await uploadOnCloudinary(req.file.path); // Upload image to Cloudinary and get URL
            imageUrl = { url: uploadResponse.url, public_id: uploadResponse.public_id }
        }

        const newEducation = new Education({
            course,
            college,
            location,
            start,
            end,
            status,
            image: imageUrl, // Store the Cloudinary URL if available
            description,
            userId
        });

        await newEducation.save();
        return res.status(201).send({ message: 'Education entry added successfully!', education: newEducation });
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message);
    }
}

// Update an existing education entry with optional image upload
exports.updateEducation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        let updatedData = req.body;

        if (req.file) { // Check if a new image file is provided
            const uploadResponse = await uploadOnCloudinary(req.file.path); // Upload new image to Cloudinary
            imageUrl = { url: uploadResponse.url, public_id: uploadResponse.public_id }
            updatedData.image = imageUrl; // Update image URL in the data to be updated
        }

        // Find and update the education entry, ensuring it belongs to the logged-in user
        const updatedEducation = await Education.findOneAndUpdate(
            { _id: id, userId }, // Find by education ID and user ID
            updatedData,
            { new: true, runValidators: true } // Return updated document and validate
        );

        if (!updatedEducation) return res.status(404).send('Education entry not found or access denied.');
        return res.status(200).send({ message: 'Education entry updated successfully!', education: updatedEducation });
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message);
    }
}

// Delete an education entry for the logged-in user
exports.deleteEducation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find and delete the education entry, ensuring it belongs to the logged-in user
        const deletedEducation = await Education.findOneAndDelete({ _id: id, userId });

        if (!deletedEducation) return res.status(404).send('Education entry not found or access denied.');
        return res.status(200).send('Education entry deleted successfully!');
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Failed to delete education entry.');
    }
}

