import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  // to edit the user's first and last name
  const [name, setName] = useState("");
  // whether we are editing or not
  const [editing, setEditing] = useState(false);
  // to edit the user's email
  const [email, setEmail] = useState("");
  // to edit the user's role
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email || "");
    setRole(user.role || "");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  // to save updates to user's name, email, and role
  const saveUser = async () => {
    // split the name into an array and get first
    const [firstName, lastName] = name.split(" ");
    // and last and create new version of user overriding
    const updatedUser = { ...user, firstName, lastName, email, role };
    // first and last. Send update to server
    await client.updateUser(updatedUser);
    // update local copy of the user
    setUser(updatedUser);
    // we're done editing
    setEditing(false);
    // close the dialog
    onClose();
  };

  // to delete the user
  const deleteUser = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    // close the dialog
    onClose();
  };

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => {
              setName(`${user.firstName} ${user.lastName}`);
              setEditing(true);
            }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div
            className="wd-name"
            onClick={() => {
              setName(`${user.firstName} ${user.lastName}`);
              setEditing(true);
            }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Roles:</b>{" "}
      {!editing ? (
        <span className="wd-roles">{user.role}</span>
      ) : (
        <select
          className="form-select d-inline-block w-auto ms-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="FACULTY">FACULTY</option>
          <option value="STUDENT">STUDENT</option>
          <option value="TA">TA</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      )}{" "}
      <br />
      <b>Email:</b>{" "}
      {!editing ? (
        <span className="wd-email">{user.email}</span>
      ) : (
        <FormControl
          type="email"
          className="d-inline-block w-auto ms-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}{" "}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
      <button
        onClick={() => deleteUser()}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
    </div>
  );
}
