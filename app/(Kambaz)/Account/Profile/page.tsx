import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input
        defaultValue="niraj.mehta"
        placeholder="username"
        className="wd-username"
      />
      <br />
      <input
        defaultValue="Niraj@762483"
        placeholder="password"
        type="password"
        className="wd-password"
      />
      <br />
      <input defaultValue="Niraj" placeholder="First Name" id="wd-firstname" />
      <br />
      <input defaultValue="Mehta" placeholder="Last Name" id="wd-lastname" />
      <br />
      <input defaultValue="2000-10-24" type="date" id="wd-dob" />
      <br />
      <input defaultValue="nirajmehta@gmail.com" type="email" id="wd-email" />
      <br />
      <select defaultValue="STUDENT" id="wd-role">
        <option value="USER">User</option> <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>{" "}
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <Link href="Signin"> Sign out </Link>
    </div>
  );
}
