import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
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
      <ListGroupItem className="border-0 bg-white text-center">
        <Link href="/Dashboard" className="text-danger text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Dashboard" className="text-white text-decoration-none">
          <LiaBookSolid className="fs-1 text-white" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Calendar" className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-white" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Inbox" className="text-white text-decoration-none">
          <FaInbox className="fs-1 text-white" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Labs" className="text-white text-decoration-none">
          <LiaCogSolid className="fs-1 text-white" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
