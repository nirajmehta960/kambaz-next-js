import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function ModuleControl() {
  const { cid } = useParams();
  const router = useRouter();
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <div
        className="input-group me-2 float-start"
        style={{ maxWidth: 560, height: "44px" }}
      >
        <span
          className="input-group-text bg-white"
          id="wd-search-assignment"
          style={{ height: "44px", borderRight: "none" }}
        >
          <BsSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          id="wd-search-assignment"
          style={{ height: "44px", borderLeft: "none" }}
        />
      </div>
      <Link
        href={`/Courses/${cid}/Assignments/new?new=true`}
        className="btn btn-danger btn-lg me-1 float-end"
        id="wd-add-assignment"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Link>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-group"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
    </div>
  );
}
