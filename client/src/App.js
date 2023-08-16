import React, { useState } from "react";
import "./App.css";
import { Badge } from "reactstrap";
import ProjectTable from "./ProjectTable";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const addProject = () => {
    if (newProject && startDate && startTime && endDate && endTime) {
      const newProjectObj = {
        project: newProject,
        startDate,
        startTime,
        endDate,
        endTime,
      };

      setProjects([...projects, newProjectObj]);
      clearInputs();
    }
  };

  const clearInputs = () => {
    setNewProject("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(`${start.startDate}T${start.startTime}`);
    const endDate = new Date(`${end.endDate}T${end.endTime}`);
    const durationInMilliseconds = endDate - startDate;

    const years = Math.floor(
      durationInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    const remainingMilliseconds =
      durationInMilliseconds % (1000 * 60 * 60 * 24 * 365);

    const days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
    const remainingMillisecondsAfterDays =
      remainingMilliseconds % (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainingMillisecondsAfterDays / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (remainingMillisecondsAfterDays % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (years > 0) {
      return `${years} years ${days} days ${hours} hours ${remainingMinutes} minutes`;
    } else if (days > 0) {
      return `${days} days ${hours} hours ${remainingMinutes} minutes`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  };

  const calculateTotalDuration = () => {
    let totalMinutes = 0;

    projects.forEach((p) => {
      const duration = calculateDuration(p, p);
      const durationInMinutes = calculateDurationInMinutes(duration);
      totalMinutes += durationInMinutes;
    });

    return totalMinutes;
  };

  const calculateDurationInMinutes = (duration) => {
    const parts = duration.split(" ");
    let totalMinutes = 0;

    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i]);
      const unit = parts[i + 1];

      if (unit === "years") {
        totalMinutes += value * 365 * 24 * 60;
      } else if (unit === "days") {
        totalMinutes += value * 24 * 60;
      } else if (unit === "hours") {
        totalMinutes += value * 60;
      } else if (unit === "minutes") {
        totalMinutes += value;
      }
    }

    return totalMinutes;
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        if (days >= 365) {
          const years = Math.floor(days / 365);
          const remainingDays = days % 365;
          return `${years} years ${remainingDays} days ${remainingHours} hours ${remainingMinutes} minutes`;
        } else {
          return `${days} days ${remainingHours} hours ${remainingMinutes} minutes`;
        }
      } else {
        return `${hours} hours ${remainingMinutes} minutes`;
      }
    } else {
      return `${minutes} minutes`;
    }
  };

  const deleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>
          <Badge color="dark">Time Tracker App</Badge>
        </h1>
      </div>
      <div className="container">
        <div>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button onClick={addProject}>Add Project</button>
        </div>
        <div>
          <hr />

          <h2>Projects</h2>
          <ProjectTable
            projects={projects}
            deleteProject={deleteProject}
            calculateDuration={calculateDuration}
          />
        </div>
      </div>
      <div className="total-duration">
        <p>
          Total Duration:{" "}
          <i>
            <b>{formatDuration(calculateTotalDuration())}</b>
          </i>
        </p>
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} <i>Yavuz Yarkın Okular</i>
        </p>
      </footer>
    </div>
  );
}

export default App;
