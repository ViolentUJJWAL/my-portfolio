const Experience = require('../models/experienceModels'); // Import the Experience model


// Helper function to validate start and end dates
validateDates = (start, end) => {
    const currentYear = new Date().getFullYear();

    if(start){
        // Check start date
        if (start.year < 1960 || start.year > currentYear) {
            throw new Error(`Start year must be between 1960 and ${currentYear}.`);
        }
        if (start.month < 1 || start.month > 12) {
            throw new Error('Start month must be between 1 and 12.');
        }
    }

    if(end){
        // Check end date or "Present"
        if (end !== "Present") {
            console.log('kjhgfds')
            if (end.year < 1960 || end.year > currentYear) {
                throw new Error(`End year must be between 1960 and ${currentYear}.`);
            }
            if (end.month < 1 || end.month > 12) {
                throw new Error('End month must be between 1 and 12.');
            }
    
            // Check if end date is after start date
            if (end.year < start.year || (end.year === start.year && end.month < start.month)) {
                throw new Error('End date must be after start date.');
            }
        }
    }
}


// Get all experiences for a specific user
exports.getAllExperiences = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from JWT or session
        const experiences = await Experience.find({ userId }).sort({ start: -1 });
        return res.status(200).json({message: "get all experirnces data", data: experiences});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to retrieve experiences.'});
    }
}

// Add a new experience entry
exports.addExperience = async (req, res) => {
    try {
        const { company, designation, start, end, description } = req.body;
        const userId = req.user.id;

        if(!company || !designation || !start || !start.month || !start.year || !end || !description){
            return res.status(400).json({ error: "all field are required" })
        }

        // Validate start and end dates
        validateDates(start, end);

        // Create a new Experience document
        const newExperience = new Experience({
            company,
            designation,
            start,
            end,
            description,
            userId
        });

        await newExperience.save();
        return res.status(201).json({ message: 'Experience added successfully!', data: newExperience });
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

// Update an existing experience entry by ID
exports.updateExperience = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { start, end } = req.body;

        // Validate start and end dates
        validateDates(start, end);


        // Find and update the experience entry
        const updatedExperience = await Experience.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedExperience) return res.status(404).json({error: 'Experience not found or access denied.'});
        return res.status(200).json({ message: 'Experience updated successfully!', data: updatedExperience });
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

// Delete an experience entry by ID
exports.deleteExperience = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find and delete the experience entry
        const deletedExperience = await Experience.findOneAndDelete({ _id: id, userId });

        if (!deletedExperience) return res.status(404).json({error: 'Experience not found or access denied.'});
        return res.status(200).json({error: 'Experience deleted successfully!'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to delete experience.'});
    }
}

