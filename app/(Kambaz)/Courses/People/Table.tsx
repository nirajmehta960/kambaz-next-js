"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable({
  users = [],
  fetchUsers,
  onUserClick,
}: {
  users?: any[];
  fetchUsers: () => void;
  onUserClick?: (userId: string) => void;
}) {
  return (
    <div id="wd-people-table">
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th className="text-nowrap">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: onUserClick ? "pointer" : "default" }}
                  onClick={() => {
                    if (onUserClick && user && user._id) {
                      onUserClick(user._id);
                    }
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name text-danger">
                    {user.firstName || ""}
                  </span>{" "}
                  <span className="wd-last-name text-danger">
                    {user.lastName || ""}
                  </span>
                </span>
              </td>
              <td className="wd-login-id">
                {user.loginId || user.username || "N/A"}
              </td>
              <td className="wd-section">{user.section || "N/A"}</td>
              <td className="wd-role">{user.role || "N/A"}</td>
              <td className="wd-last-activity text-nowrap">
                {user.lastActivity || "N/A"}
              </td>
              <td className="wd-total-activity">
                {user.totalActivity || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
