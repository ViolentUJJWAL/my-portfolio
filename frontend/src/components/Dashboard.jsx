// src/components/Dashboard.jsx
import React from 'react';
import LogoutButton from './LogoutButton';

const mockData = {
  user: { name: 'John Doe', email: 'john@example.com' },
  skills: ['JavaScript', 'React', 'Node.js'],
  experience: [{ company: 'TechCorp', role: 'Developer', duration: '2 years' }],
  education: [{ institution: 'State University', degree: 'BSc Computer Science' }],
  projects: [{ title: 'Portfolio Website', description: 'Personal portfolio site' }],
};

const Dashboard = () => (
  <div className="dashboard">
    <h2>Welcome, {mockData.user.name}</h2>
    <LogoutButton />
    <section>
      <h3>User Info</h3>
      <p>Email: {mockData.user.email}</p>
    </section>
    <section>
      <h3>Skills</h3>
      <ul>{mockData.skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
    </section>
    <section>
      <h3>Experience</h3>
      <ul>{mockData.experience.map((exp, i) => <li key={i}>{exp.company} - {exp.role} ({exp.duration})</li>)}</ul>
    </section>
    <section>
      <h3>Education</h3>
      <ul>{mockData.education.map((edu, i) => <li key={i}>{edu.institution} - {edu.degree}</li>)}</ul>
    </section>
    <section>
      <h3>Projects</h3>
      <ul>{mockData.projects.map((proj, i) => <li key={i}>{proj.title}: {proj.description}</li>)}</ul>
    </section>
  </div>
);

export default Dashboard;
