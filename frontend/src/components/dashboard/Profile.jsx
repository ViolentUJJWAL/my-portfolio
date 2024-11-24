import React, { useState, useEffect } from 'react';

const PortfolioDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('/api/user');
        const userData = await userResponse.json();

        // Fetch skills
        const skillsResponse = await fetch('/api/skills');
        const skillsData = await skillsResponse.json();

        // Fetch experiences
        const experiencesResponse = await fetch('/api/experiences');
        const experiencesData = await experiencesResponse.json();

        // Fetch educations
        const educationsResponse = await fetch('/api/educations');
        const educationsData = await educationsResponse.json();

        // Fetch projects
        const projectsResponse = await fetch('/api/projects');
        const projectsData = await projectsResponse.json();

        setUserData(userData);
        setSkills(skillsData);
        setExperiences(experiencesData);
        setEducations(educationsData);
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (model, id) => {
    try {
      const response = await fetch(`/api/${model}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      // Refresh the specific data set after deletion
      switch(model) {
        case 'skills':
          setSkills(skills.filter(item => item._id !== id));
          break;
        case 'experiences':
          setExperiences(experiences.filter(item => item._id !== id));
          break;
        case 'educations':
          setEducations(educations.filter(item => item._id !== id));
          break;
        case 'projects':
          setProjects(projects.filter(item => item._id !== id));
          break;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = (model, item) => {
    // Open update modal or navigate to update page
    // You'd implement specific update logic here
    console.log(`Update ${model}:`, item);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      
      {/* User Section */}
      {userData && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="bg-white shadow rounded p-4">
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Designation: {userData.designation.join(', ')}</p>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        {skills.map(skill => (
          <div key={skill._id} className="flex justify-between items-center bg-white shadow rounded p-4 mb-2">
            <div>
              <p>{skill.name}</p>
              <img src={skill.icon.url} alt={skill.name} className="w-10 h-10" />
            </div>
            <div>
              <button 
                onClick={() => handleUpdate('skills', skill)} 
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete('skills', skill._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Experiences</h2>
        {experiences.map(exp => (
          <div key={exp._id} className="bg-white shadow rounded p-4 mb-2">
            <p>{exp.company} - {exp.designation}</p>
            <p>{exp.start.month}/{exp.start.year} - {exp.end === 'Present' ? 'Present' : `${exp.end.month}/${exp.end.year}`}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => handleUpdate('experiences', exp)} 
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete('experiences', exp._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Education</h2>
        {educations.map(edu => (
          <div key={edu._id} className="bg-white shadow rounded p-4 mb-2">
            <p>{edu.course} at {edu.college}</p>
            <p>{edu.start.month}/{edu.start.year} - {edu.end.month}/{edu.end.year}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => handleUpdate('educations', edu)} 
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete('educations', edu._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        {projects.map(project => (
          <div key={project._id} className="bg-white shadow rounded p-4 mb-2">
            <h3>{project.title}</h3>
            <img src={project.image.url} alt={project.title} className="w-full h-48 object-cover" />
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Project Link</a>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => handleUpdate('projects', project)} 
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete('projects', project._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PortfolioDashboard;