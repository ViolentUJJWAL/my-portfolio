import api from './api'; // Axios instance
import { toast } from "react-toastify";

// Toastify Promise Wrapper
const toastifyPromise = async (promise, successMessage, errorMessage) => {
    try {
        const response = await toast.promise(
            promise,
            {
                pending: "Processing...",
                success: successMessage,
                error: errorMessage,
            },
            { autoClose: 3000 }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data.error : error.message;
    }
};

// Services
const services = {
    // Education Services
    getAllEducation: () => toastifyPromise(api.get("/education"), "Fetched education data!", "Failed to fetch education."),
    addEducation: (data) =>
        toastifyPromise(api.post("/education", data), "Education added successfully!", "Failed to add education."),
    updateEducation: (id, data) =>
        toastifyPromise(api.put(`/education/${id}`, data), "Education updated successfully!", "Failed to update education."),
    deleteEducation: (id) =>
        toastifyPromise(api.delete(`/education/${id}`), "Education deleted successfully!", "Failed to delete education."),

    // Experience Services
    getAllExperiences: () => toastifyPromise(api.get("/experiences"), "Fetched experiences!", "Failed to fetch experiences."),
    addExperience: (data) =>
        toastifyPromise(api.post("/experiences", data), "Experience added successfully!", "Failed to add experience."),
    updateExperience: (id, data) =>
        toastifyPromise(api.put(`/experiences/${id}`, data), "Experience updated successfully!", "Failed to update experience."),
    deleteExperience: (id) =>
        toastifyPromise(api.delete(`/experiences/${id}`), "Experience deleted successfully!", "Failed to delete experience."),

    // Project Services
    getAllProjects: () => toastifyPromise(api.get("/projects"), "Fetched projects!", "Failed to fetch projects."),
    addProject: (data) =>
        toastifyPromise(api.post("/projects", data), "Project added successfully!", "Failed to add project."),
    updateProject: (id, data) =>
        toastifyPromise(api.put(`/projects/${id}`, data), "Project updated successfully!", "Failed to update project."),
    deleteProject: (id) =>
        toastifyPromise(api.delete(`/projects/${id}`), "Project deleted successfully!", "Failed to delete project."),

    // Skill Services
    getAllSkills: () => toastifyPromise(api.get("/skills"), "Fetched skills!", "Failed to fetch skills."),
    addSkill: (data) =>
        toastifyPromise(api.post("/skills", data), "Skill added successfully!", "Failed to add skill."),
    updateSkill: (id, data) =>
        toastifyPromise(api.put(`/skills/${id}`, data), "Skill updated successfully!", "Failed to update skill."),
    deleteSkill: (id) =>
        toastifyPromise(api.delete(`/skills/${id}`), "Skill deleted successfully!", "Failed to delete skill."),
};

export default services;
