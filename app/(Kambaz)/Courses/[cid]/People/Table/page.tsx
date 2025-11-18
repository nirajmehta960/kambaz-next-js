"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as client from "../../../client";
import PeopleDetails from "../Details";

export default function PeopleTable() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const [users, setUsers] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const courseUsers = await client.findUsersForCourse(courseId);
      // Filter out null/undefined users and ensure all users have required properties
      const validUsers = (courseUsers || []).filter(
        (user: any) => user && user._id && typeof user === "object"
      );
      setUsers(validUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users
              .filter((user: any) => user && user._id)
              .map((user: any, index: number) => (
                <tr key={user._id || `user-${index}`}>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span
                      onClick={() => {
                        if (user && user._id) {
                          setShowDetails(true);
                          setShowUserId(user._id);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="wd-first-name">
                        {user?.firstName || ""}
                      </span>{" "}
                      <span className="wd-last-name">
                        {user?.lastName || ""}
                      </span>
                    </span>
                  </td>
                  <td className="wd-login-id">{user?.loginId || ""}</td>
                  <td className="wd-section">{user?.section || ""}</td>
                  <td className="wd-role">{user?.role || ""}</td>
                  <td className="wd-last-activity">
                    {user?.lastActivity || ""}
                  </td>
                  <td className="wd-total-activity">
                    {user?.totalActivity || ""}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
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
