"use client";
import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: 101,
    name: "Backend Development",
    description: "Learn how to build backend applications",
    course: "Full Stack Web Development",
  });

  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>

      <a
        id="wd-retrieve-module"
        className="btn btn-danger me-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>

      <a
        id="wd-retrieve-module-name"
        className="btn btn-danger me-2"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      <div className="mb-3">
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title{" "}
        </a>
        <FormControl
          className="w-75"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <a
          id="wd-update-module-name"
          className="btn btn-danger d-inline-block float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name{" "}
        </a>
        <FormControl
          className="d-inline-block w-50 me-2"
          id="wd-module-name"
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <a
          id="wd-update-module-description"
          className="btn btn-success d-inline-block float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description{" "}
        </a>
        <FormControl
          className="d-inline-block w-50 me-2"
          id="wd-module-description"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <a
          id="wd-update-assignment-score"
          className="btn btn-warning d-inline-block float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Assignment Score{" "}
        </a>
        <FormControl
          className="d-inline-block w-50 me-2"
          id="wd-assignment-score"
          type="number"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
      </div>
      <hr />

      <h4>Modifying Assignment Completed Status</h4>
      <div className="d-flex align-items-center mb-2">
        <FormCheck.Input
          id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
          className="me-2" // Add some margin to the right of the checkbox
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed{" "}
        </a>
      </div>
      <hr />
    </div>
  );
}
