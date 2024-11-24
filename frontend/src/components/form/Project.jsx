// components/LogoutButton.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Project = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);

    const handleProjectForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image); // Append the image file
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);

        toast.success("Skill Added successfully!");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };


    return (
        <div className="box-root flex-flex flex-direction--column" style={{ "flexGrow": "1", "zIndex": "2" }}>
            <h1>Add Your Project</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form onSubmit={handleProjectForm}>
                            <div className="field">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder='Enate Title ....'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="link">Project Link</label>
                                <input
                                    type='text'
                                    name="link"
                                    placeholder='Enter Project Link ....'
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="image">Project Image</label>
                                <input type='file'
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    rows={3}
                                    type="text"
                                    name="description"
                                    placeholder='Description About your Project ....'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="field padding-bottom--24">
                                <input type="submit" name="submit" value="Add Project" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Project;
