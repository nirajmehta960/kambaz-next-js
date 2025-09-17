import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <ul>
        <li>
          <Link href="Signin" id="wd-signin-link">
            Signin
          </Link>
          <br />
        </li>
        <li>
          <Link href="Signup" id="wd-signup-link">
            Signup
          </Link>
          <br />
        </li>
        <li>
          <Link href="Profile" id="wd-profile-link">
            Profile
          </Link>
          <br />
        </li>
      </ul>
    </div>
  );
}
