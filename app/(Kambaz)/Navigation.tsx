"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href);
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
      >
        <img
          src="/images/neulogo.jpg"
          width="75px"
          alt="Northeastern University"
        />
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Account" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          isActive("/Dashboard") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Dashboard"
          className={`${
            isActive("/Dashboard") ? "text-danger" : "text-white"
          } text-decoration-none`}
        >
          <AiOutlineDashboard
            className={`fs-1 ${
              isActive("/Dashboard") ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          isActive("/Courses") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Dashboard"
          className={`${
            isActive("/Courses") ? "text-danger" : "text-white"
          } text-decoration-none`}
        >
          <LiaBookSolid
            className={`fs-1 ${
              isActive("/Courses") ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          isActive("/Calendar") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Calendar"
          className={`${
            isActive("/Calendar") ? "text-danger" : "text-white"
          } text-decoration-none`}
        >
          <IoCalendarOutline
            className={`fs-1 ${
              isActive("/Calendar") ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          isActive("/Inbox") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Inbox"
          className={`${
            isActive("/Inbox") ? "text-danger" : "text-white"
          } text-decoration-none`}
        >
          <FaInbox
            className={`fs-1 ${
              isActive("/Inbox") ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          isActive("/Labs") ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Labs"
          className={`${
            isActive("/Labs") ? "text-danger" : "text-white"
          } text-decoration-none`}
        >
          <LiaCogSolid
            className={`fs-1 ${
              isActive("/Labs") ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
