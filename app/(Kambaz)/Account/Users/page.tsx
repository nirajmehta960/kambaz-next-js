"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/People/Table";
import PeopleDetails from "../../Courses/[cid]/People/Details";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const [name, setName] = useState("");
  const createUser = async () => {
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      // Refresh users list from database to ensure we have the latest data
      await fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const { uid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  return (
    <div>
      <h3>Users</h3>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="me-3 wd-filter-by-name"
          style={{ width: "300px" }}
        />

        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select wd-select-role"
          style={{ width: "200px" }}
        >
          <option value="">All Roles</option>{" "}
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>{" "}
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>

        {currentUser?.role === "ADMIN" && (
          <button
            onClick={createUser}
            className="btn btn-danger ms-5 d-inline-flex align-items-center wd-add-people"
          >
            <FaPlus className="me-2" />
            Users
          </button>
        )}
      </div>
      <PeopleTable
        users={users}
        fetchUsers={fetchUsers}
        onUserClick={(userId: string) => {
          setShowUserId(userId);
          setShowDetails(true);
        }}
      />
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}
