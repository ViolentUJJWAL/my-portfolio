// src/components/Dashboard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { getApi, postApi } from '../api/api';  // Assume postApi is used for updates
import Loading from './Loading';
import { FaDownload, FaEdit } from 'react-icons/fa';
import "../assets/styles/dashboard/style.css"

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { userData, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(true);
  const [editData, setEditData] = useState({});
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    if (!userData) {
      (async () => {
        try {
          setLoading(true);
          const resData = await getApi("/profile");
          setUser(resData.data);
          setEditData(resData.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
    effectRan.current = true;
  }, [userData, setUser]);

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(field, file);

    try {
      setLoading(true);
      const response = await postApi(`/upload-${field}`, formData);  // Adjust your endpoint as needed
      setUser((prev) => ({ ...prev, [field]: response.data }));
      alert(`${field} uploaded successfully`);
    } catch (error) {
      console.error(error);
      alert(`Failed to upload ${field}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTextUpdate = async () => {
    try {
      setLoading(true);
      await postApi('/update-profile', editData);
      setUser(editData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (!userData) {
    return <div className="no-data-message">No Data Available</div>;
  }

  return (
    <div className="dashboard">
      {loading && <Loading />}
      <div className="user-profile-card">
        {/* Profile Image */}
        <div className="profile-header">
          <img src={userData.profilrImage?.url || ''} alt="Profile" className="profile-image" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'profilrImage')}
            style={{ display: 'none' }}
            id="upload-profile"
          />
          <label htmlFor="upload-profile" className="upload-button">
            <FaEdit /> Upload Profile Image
          </label>
          <h2 className="name">{userData.name || 'No Name Available'}</h2>
          <p className="username">@{userData.username || 'No Username Available'}</p>
        </div>

        {/* Logo */}
        <div className="logo-container">
          {userData.logo?.url ? (
            <>
              <img src={userData.logo.url} alt="Company Logo" className="company-logo" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'logo')}
                style={{ display: 'none' }}
                id="upload-logo"
              />
              <label htmlFor="upload-logo" className="upload-button">
                <FaEdit /> Upload Logo
              </label>
            </>
          ) : (
            <p>No Logo Available</p>
          )}
        </div>

        {/* Designations */}
        <div className="section">
          <h3>Designations</h3>
          {isEditing ? (
            <textarea
              value={editData.designation?.join(', ') || ''}
              onChange={(e) =>
                setEditData({ ...editData, designation: e.target.value.split(',').map((d) => d.trim()) })
              }
            />
          ) : (
            <ul>
              {userData.designation?.length ? (
                userData.designation.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <p>No Designations Available</p>
              )}
            </ul>
          )}
          <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
            <FaEdit /> Edit Designations
          </button>
        </div>

        {/* Address */}
        <div className="section">
          <h3>Address</h3>
          {isEditing ? (
            <textarea
              value={`${editData?.address?.city || ''}, ${editData?.address?.state || ''}, ${editData?.address?.country || ''}, ${editData?.address?.pin || ''}`}
              onChange={(e) => {
                const [city, state, country, pin] = e.target.value.split(',').map((d) => d.trim());
                setEditData({
                  ...editData,
                  address: { city, state, country, pin },
                });
              }}
            />
          ) : (
            <p>
              {userData.address
                ? `${userData.address.city}, ${userData.address.state}, ${userData.address.country} - ${userData.address.pin}`
                : 'No Address Available'}
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="section">
          <h3>Contact</h3>
          <p>Phone: {isEditing ? <input value={editData.phoneno || ''} onChange={(e) => setEditData({ ...editData, phoneno: e.target.value })} /> : userData.phoneno}</p>
          <p>Email: {isEditing ? <input value={editData.email || ''} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /> : userData.email}</p>
        </div>

        {/* Social Media Links */}
        <div className="social-links">
          <h3>Social Links</h3>
          {userData.link?.length ? (
            userData.link.map((social) => (
              <a href={social.url} target="_blank" rel="noopener noreferrer" key={social._id}>
                <img src={social.icon} alt={social.name} className="social-icon" />
              </a>
            ))
          ) : (
            <p>No Social Links Available</p>
          )}
        </div>

        {/* About Section */}
        <div className="section about">
          <h3>About</h3>
          {isEditing ? (
            <textarea
              value={editData.about || ''}
              onChange={(e) => setEditData({ ...editData, about: e.target.value })}
            />
          ) : (
            <p>{userData.about || 'No About Information Available'}</p>
          )}
        </div>

        {/* Resume Download Button */}
        {userData.resume?.url ? (
          <>
            <button className="resume-button" onClick={() => window.open(userData.resume.url, '_blank')}>
              <FaDownload /> Download Resume
            </button>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, 'resume')}
              style={{ display: 'none' }}
              id="upload-resume"
            />
            <label htmlFor="upload-resume" className="upload-button">
              <FaEdit /> Upload Resume
            </label>
          </>
        ) : (
          <p>No Resume Available</p>
        )}

        {/* Save Changes Button */}
        {isEditing && (
          <button onClick={handleTextUpdate} className="save-button">
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;