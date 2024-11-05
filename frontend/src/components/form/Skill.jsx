// components/LogoutButton.js
import React from 'react';


const Skills = () => {
    return (
        <div className="box-root flex-flex flex-direction--column" style={{ "flexGrow": "1", "zIndex": "2" }}>
            <h1>Skills</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder='Enate Email' />
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea rows={3} type="text" name="description"></textarea>
                            </div>
                            <div className="field">
                                <label htmlFor="icon">Skill Image Icon</label>
                                <input type='file' name="icon" />
                            </div>
                            <div className="field padding-bottom--24">
                                <input type="submit" name="submit" value="Continue" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Skills;
