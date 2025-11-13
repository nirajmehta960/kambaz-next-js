"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const adminLinks =
    currentUser && currentUser.role === "ADMIN" ? ["Users"] : [];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = `/Account/${link}`;
        const isActive = pathname?.toLowerCase().includes(link.toLowerCase());
        const linkId = `wd-account-${link.toLowerCase()}-link`;

        return (
          <Link
            key={link}
            href={href}
            id={linkId}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
      {adminLinks.map((link) => {
        const href = `/Account/${link}`;
        const isActive = pathname?.endsWith(link);
        const linkId = `wd-account-${link.toLowerCase()}-link`;

        return (
          <Link
            key={link}
            href={href}
            id={linkId}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
