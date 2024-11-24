// components/LogoutButton.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Education = () => {

    const [course, setCourse] = useState("")
    const [college, setCollege] = useState("")
    const [location, setLocation] = useState("")
    const [start, setStart] = useState({})
    const [end, setEnd] = useState({})
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)


    const handleEducationForm = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image); // Append the image file
        formData.append('course', course);
        formData.append('description', description);
        formData.append('college', college);
        formData.append('location', location);
        formData.append('start', start);
        formData.append('end', end);

        toast.success("Skill Added successfully!");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    }

    return (
        <div className="box-root flex-flex flex-direction--column" style={{ "flexGrow": "1", "zIndex": "2" }}>
            <h1>Add Your Education</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form onSubmit={handleEducationForm}>
                            <div className="field">
                                <label htmlFor="course">Course Name</label>
                                <input type="text" name="course" placeholder='Enate Course Name ....' value={course} onChange={(e)=>setCourse(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="college">College Name</label>
                                <input type="text" name="college" placeholder='Enate College Name ....' value={college} onChange={(e)=>setCollege(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="location">Location</label>
                                <input type="text" name="location" placeholder='Enate College Location ....' value={location} onChange={(e)=>setLocation(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="start">Starting</label>
                                <div style={{ "display": "flex" }}>
                                    <input type="number" min={1} max={12} style={{ "width": "45%", "marginRight": "2%" }} name="startMonth" placeholder='Month' value={start.month} onChange={(e)=>setStart({...start, month: e.target.value})} />
                                    <input type="number" min={1960} max={(Date.now().getFullYear) + 10} style={{ "width": "45%" }} name="startYear" placeholder='Year' value={start.year} onChange={(e)=>setStart({...start, year: e.target.value})} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="start">End</label>
                                <div style={{ "display": "flex" }}>
                                    <input type="number" min={1} max={12} style={{ "width": "45%", "marginRight": "2%" }} name="endMonth" placeholder='Month' value={end.month} onChange={(e)=>setEnd({...start, month: e.target.value})} />
                                    <input type="number" min={ start.year ||1960} max={(Date.now().getFullYear) + 10} style={{ "width": "45%" }} name="endYear" placeholder='Year' value={end.year} onChange={(e)=>setEnd({...start, year: e.target.value})} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="image">Education Image</label>
                                <input type='file' accept="image/*" name="image" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea rows={3} type="text" name="description" placeholder='Description About your Education ....' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="field padding-bottom--24">
                                <input type="submit" name="submit" value="Add Education" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Education;
