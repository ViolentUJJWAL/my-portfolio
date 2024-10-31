const Experience = require('../models/Experience'); // Import the Experience model




// Helper function to validate start and end dates
validateDates = (start, end) => {
    const currentYear = new Date().getFullYear();

    // Check start date
    if (start.year < 1960 || start.year > currentYear) {
        throw new Error(`Start year must be between 1960 and ${currentYear}.`);
    }
    if (start.month < 1 || start.month > 12) {
        throw new Error('Start month must be between 1 and 12.');
    }

    // Check end date or "Present"
    if (end !== "Present") {
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


// Get all experiences for a specific user
exports.getUserExperiences = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from JWT or session
        const experiences = await Experience.find({ userId }).sort({ start: -1 });
        res.status(200).send(experiences);
    } catch (error) {
        res.status(500).send('Failed to retrieve experiences.');
    }
}

// Add a new experience entry
exports.addExperience = async (req, res) => {
    try {
        const { company, designation, start, end, description } = req.body;
        const userId = req.user.id;

        // Validate start and end dates
        ExperienceController.validateDates(start, end);

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
        res.status(201).send({ message: 'Experience added successfully!', experience: newExperience });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Update an existing experience entry by ID
exports.updateExperience = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { start, end } = req.body;

        // Validate start and end dates
        ExperienceController.validateDates(start, end);

        // Find and update the experience entry
        const updatedExperience = await Experience.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedExperience) return res.status(404).send('Experience not found or access denied.');
        res.status(200).send({ message: 'Experience updated successfully!', experience: updatedExperience });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Delete an experience entry by ID
exports.deleteExperience = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Find and delete the experience entry
        const deletedExperience = await Experience.findOneAndDelete({ _id: id, userId });

        if (!deletedExperience) return res.status(404).send('Experience not found or access denied.');
        res.status(200).send('Experience deleted successfully!');
    } catch (error) {
        res.status(500).send('Failed to delete experience.');
    }
}

