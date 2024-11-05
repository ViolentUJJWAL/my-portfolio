// components/LogoutButton.js
import React from 'react';


const Skills = () => {
    return (
        <div className="box-root flex-flex flex-direction--column" style={{ "flexGrow": "1", "zIndex": "2" }}>
            <h1>Skills</h1>
            <div className="formbg-outer">
                <div className="formbg">
                    <div className="formbg-inner padding-top--24">
                        <form id="stripe-login">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder='Email' />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" />
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
