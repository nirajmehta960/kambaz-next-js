import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

export default function ModuleControl() {
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
      <Button
        variant="danger"
        size="lg"
        className="me-2 float-end"
        id="wd-add-assignment"
        style={{ height: "44px" }}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-2 float-end"
        id="wd-add-assignment-group"
        style={{ height: "44px" }}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
    </div>
  );
}
