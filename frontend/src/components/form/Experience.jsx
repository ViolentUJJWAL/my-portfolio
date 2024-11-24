// components/LogoutButton.js
import React from 'react';


const Experience = () => {
    return (
        <div className="box-root flex-flex flex-direction--column" style={{ "flexGrow": "1", "zIndex": "2" }}>
            <h1>Add Your Experience</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form>
                            <div className="field">
                                <label htmlFor="course">Company Name</label>
                                <input type="text" name="course" placeholder='Enate Company Name ....' />
                            </div>
                            <div className="field">
                                <label htmlFor="designation">Designation</label>
                                <input type="text" name="designation" placeholder='Enate Designation In Company ....' />
                            </div>
                            <div className="field">
                                <label htmlFor="start">Starting</label>
                                <div style={{ "display": "flex" }}>
                                    <input type="text" style={{ "width": "45%", "marginRight": "2%" }} name="startMonth" placeholder='Month' />
                                    <input type="text" style={{ "width": "45%" }} name="startYear" placeholder='Year' />
                                </div>
                            </div>
                            <div className="field">
                                    <label htmlFor="start">End</label>
                                    <input type="checkbox" /> Present (On Running Experience)
                                <div style={{ "display": "flex" }}>
                                    <input type="text" style={{ "width": "45%", "marginRight": "2%" }} name="endMonth" placeholder='Month' />
                                    <input type="text" style={{ "width": "45%" }} name="endYear" placeholder='Year' />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea rows={3} type="text" name="description" placeholder='Description About your Experience ....'></textarea>
                            </div>
                            <div className="field padding-bottom--24">
                                <input type="submit" name="submit" value="Add Experience" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Experience;
