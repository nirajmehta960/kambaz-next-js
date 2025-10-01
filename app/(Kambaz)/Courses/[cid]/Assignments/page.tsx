"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModuleControlButton from "./ModuleControlButton";
import ModuleControl from "./ModuleControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
export default function Assignments() {
  const params = useParams();
  const cid = params.cid;
  return (
    <div id="wd-assignments">
      <div className="clearfix mb-4">
        <ModuleControl />
      </div>
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments-title p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />{" "}
              <BsFillCaretDownFill className="me-2 fs-5" />
              ASSIGNMENTS{" "}
            </div>
            <div className="d-flex align-items-center">
              <span className="badge rounded-pill border border-black bg-secondary text-black fw-semibold px-2 py-1">
                40% of Total
              </span>
              <AssignmentControlButtons />
            </div>
          </div>
          <ListGroup
            className="wd-assignment-list rounded-0"
            id="wd-assignment-list"
          >
            <ListGroupItem className="wd-assignment-list-item list-group-item-action p-2 ps-1 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <BsPencilSquare className="text-success me-2 fs-4" />
              </span>
              <Link
                href={`/Courses/${cid}/Assignments/123`}
                className="d-flex text-decoration-none flex-grow-1 me-3"
              >
                <span>
                  <span className="wd-assignment-link fw-semibold text-decoration-none fs-5">
                    A1
                  </span>
                  <div className="wd-assignment-details text-body-secondary">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 6 at 12:00am |{" "}
                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </span>
              </Link>
              <ModuleControlButton />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item list-group-item-action p-2 ps-1 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <BsPencilSquare className="text-success me-2 fs-4" />
              </span>
              <Link
                href={`/Courses/${cid}/Assignments/124`}
                className="d-flex text-decoration-none flex-grow-1 me-3"
              >
                <span>
                  <span className="wd-assignment-link fw-semibold text-decoration-none fs-5">
                    A2
                  </span>
                  <div className="wd-assignment-details text-body-secondary">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 13 at 12:00am |{" "}
                    <strong>Due</strong> May 20 at 11:59pm | 100 pts
                  </div>
                </span>
              </Link>
              <ModuleControlButton />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item list-group-item-action p-2 ps-1 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
                <BsPencilSquare className="text-success me-2 fs-4" />
              </span>
              <Link
                href={`/Courses/${cid}/Assignments/125`}
                className="d-flex text-decoration-none flex-grow-1 me-3"
              >
                <span>
                  <span className="wd-assignment-link fw-semibold text-decoration-none fs-5">
                    A3
                  </span>
                  <div className="wd-assignment-details text-body-secondary">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 20 at 12:00am |{" "}
                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                  </div>
                </span>
              </Link>
              <ModuleControlButton />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
