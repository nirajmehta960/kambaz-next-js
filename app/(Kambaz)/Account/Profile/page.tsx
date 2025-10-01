import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        defaultValue="niraj.mehta"
        placeholder="username"
        id="wd-username"
        className="mb-2"
      />
      <FormControl
        defaultValue="Niraj@762483"
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2"
      />
      <FormControl
        defaultValue="Niraj"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2"
      />
      <FormControl
        defaultValue="Mehta"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2"
      />
      <FormControl
        defaultValue="2000-10-24"
        type="date"
        id="wd-dob"
        className="mb-2"
      />
      <FormControl
        defaultValue="niraj.mehta@gmail.com"
        type="email"
        id="wd-email"
        className="mb-2"
      />
      <FormControl
        as="select"
        defaultValue="STUDENT"
        id="wd-role"
        className="mb-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl>
      <Link id="wd-signup-btn" href="Signin" className="btn btn-danger w-100">
        {" "}
        Sign out{" "}
      </Link>
    </div>
  );
}
