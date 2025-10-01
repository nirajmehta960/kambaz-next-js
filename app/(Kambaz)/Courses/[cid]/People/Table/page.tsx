import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
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
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561T</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span>{" "}
              <span className="wd-last-name">Wayne</span>
            </td>
            <td className="wd-login-id">001234562B</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-10</td>
            <td className="wd-total-activity">11:15:16</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span>{" "}
              <span className="wd-last-name">Rogers</span>
            </td>
            <td className="wd-login-id">001234563S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-12</td>
            <td className="wd-total-activity">1:42:08</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{" "}
              <span className="wd-last-name">Romanoff</span>
            </td>
            <td className="wd-login-id">001234564N</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-13</td>
            <td className="wd-total-activity">08:35:40</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Niraj</span>{" "}
              <span className="wd-last-name">Mehta</span>
            </td>
            <td className="wd-login-id">001234565N</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2025-09-14</td>
            <td className="wd-total-activity">07:28:19</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Ajinkya</span>{" "}
              <span className="wd-last-name">Rahane</span>
            </td>
            <td className="wd-login-id">001234566A</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-15</td>
            <td className="wd-total-activity">09:15:16</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Krishna</span>{" "}
              <span className="wd-last-name">Shah</span>
            </td>
            <td className="wd-login-id">001234567K</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2025-09-16</td>
            <td className="wd-total-activity">08:15:10</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
