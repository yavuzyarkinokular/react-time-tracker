import React from "react";
import { Table } from "reactstrap";

function ProjectTable({ projects, deleteProject, calculateDuration }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Project</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>End Date</th>
          <th>End Time</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p, index) => (
          <tr key={index}>
            <td>{p.project}</td>
            <td>{p.startDate}</td>
            <td>{p.startTime}</td>
            <td>{p.endDate}</td>
            <td>{p.endTime}</td>
            <td>{calculateDuration(p, p)}</td>
            <td>
              <button onClick={() => deleteProject(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProjectTable;
