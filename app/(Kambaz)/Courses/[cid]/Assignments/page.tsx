"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModuleControlButton from "./ModuleControlButton";
import ModuleControl from "./ModuleControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
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
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any, index: number) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment-list-item list-group-item-action p-2 ps-1 d-flex justify-content-between align-items-center"
                >
                  <span className="d-flex align-items-center me-2">
                    <BsGripVertical className="fs-3" />
                    <BsPencilSquare className="text-success me-2 fs-4" />
                  </span>
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="d-flex text-decoration-none flex-grow-1 me-3"
                  >
                    <span>
                      <span className="wd-assignment-link fw-semibold text-decoration-none fs-5">
                        {assignment._id}
                      </span>
                      <div className="wd-assignment-details text-body-secondary">
                        <span className="text-danger">{assignment.title}</span>{" "}
                        | <strong>Not available until</strong>{" "}
                        {formatDate(assignment.availableFrom)} |{" "}
                        <strong>Due</strong> {formatDate(assignment.dueDate)} |{" "}
                        {assignment.points ?? 0} pts
                      </div>
                    </span>
                  </Link>
                  <span className="d-flex align-items-center me-2 float-end">
                    <FaTrash
                      className="text-danger me-2 mb-1"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowDelete(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <ModuleControlButton />
                  </span>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedAssignment?.title}</strong> ? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (selectedAssignment) {
                dispatch(deleteAssignment(selectedAssignment._id));
              }
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
