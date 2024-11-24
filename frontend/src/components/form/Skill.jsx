// components/Skills.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Skills = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState(null);

    const handleSkillForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('icon', icon); // Append the image file
        formData.append('name', name);
        formData.append('description', description);

        toast.success("Skill Added successfully!");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
    };

    return (
        <div className="box-root flex-flex flex-direction--column" style={{ flexGrow: "1", zIndex: "2" }}>
            <h1>Add Your Skill</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form onSubmit={handleSkillForm}>
                            <div className="field">
                                <label htmlFor="name">Skill Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Your Skill..."
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="icon">Skill Image Icon</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="icon"
                                    onChange={(e) => setIcon(e.target.files[0])} // Only set the selected file
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    rows={3}
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    name="description"
                                    placeholder="Description About Your Skill..."
                                />
                            </div>
                            <div className="field padding-bottom--24">
                                <input type="submit" name="submit" value="Add Skill" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
