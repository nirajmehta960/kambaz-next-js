"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as db from "../Database";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({ ...courses[0] });
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editableCourse, setEditableCourse] = useState<any>({
    name: "",
    description: "",
  });

  // Map course IDs to specific images
  const getCourseImage = (courseId: string) => {
    const imageMap: { [key: string]: string } = {
      RS101: "/images/advwebdev.jpg", // Rocket Propulsion
      RS102: "/images/ai-ml.jpg", // Aerodynamics
      RS103: "/images/cloudcomp.jpg", // Spacecraft Design
      RS104: "/images/dbms.jpg", // Organic Chemistry
      RS105: "/images/appdev.jpg", // Inorganic Chemistry
      RS106: "/images/nextjs.jpg", // Physical Chemistry
      RS107: "/images/reactjs.jpg", // Ancient Languages
      RS108: "/images/nodejs.jpg", // Inter-species Diplomacy
    };
    return imageMap[courseId] || "/images/reactjs.jpg"; // Default image
  };
  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser && (
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-primary"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Enrolled Only" : "Show All Courses"}
            </button>
            {currentUser?.role === "FACULTY" && (
              <button
                className="btn btn-success"
                id="wd-add-new-course-click"
                onClick={() => {
                  setModalMode("add");
                  setEditableCourse({ name: "", description: "" });
                  setShowModal(true);
                }}
              >
                Add New Course
              </button>
            )}
          </div>
        )}
      </div>
      <hr />
      <h2 id="wd-dashboard-published">
        {!currentUser
          ? `Enrolled Courses (0)`
          : showAll
          ? `Published Courses (${courses.length})`
          : `Enrolled Courses (${
              enrollments.filter((e: any) => e.user === currentUser._id).length
            })`}
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        {currentUser ? (
          <Row xs={1} md={5} className="g-4">
            {(showAll || !currentUser
              ? courses
              : courses.filter((c: any) =>
                  enrollments.some(
                    (enr: any) =>
                      enr.user === currentUser._id && enr.course === c._id
                  )
                )
            ).map((course: any) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card className="h-100" style={{ height: 380 }}>
                  {(() => {
                    const canAccess =
                      currentUser &&
                      enrollments.some(
                        (e: any) =>
                          e.user === currentUser._id && e.course === course._id
                      );
                    return canAccess ? (
                      <Link
                        href={`/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none"
                      >
                        <CardImg
                          src={getCourseImage(course._id)}
                          variant="top"
                          width="100%"
                          height={160}
                        />
                      </Link>
                    ) : (
                      <CardImg
                        src={getCourseImage(course._id)}
                        variant="top"
                        width="100%"
                        height={160}
                      />
                    );
                  })()}
                  <CardBody className="card-body">
                    {(() => {
                      const canAccess =
                        currentUser &&
                        enrollments.some(
                          (e: any) =>
                            e.user === currentUser._id &&
                            e.course === course._id
                        );
                      return canAccess ? (
                        <Link
                          href={`/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                            {course.name}{" "}
                          </CardTitle>
                          <CardText
                            className="wd-dashboard-course-description overflow-hidden"
                            style={{ height: "100px" }}
                          >
                            {course.description}{" "}
                          </CardText>
                        </Link>
                      ) : (
                        <>
                          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                            {course.name}{" "}
                          </CardTitle>
                          <CardText
                            className="wd-dashboard-course-description overflow-hidden"
                            style={{ height: "100px" }}
                          >
                            {course.description}{" "}
                          </CardText>
                        </>
                      );
                    })()}
                    <div className="d-flex gap-2 align-items-center mt-2">
                      {(() => {
                        const isEnrolled = currentUser
                          ? enrollments.some(
                              (e: any) =>
                                e.user === currentUser._id &&
                                e.course === course._id
                            )
                          : false;
                        if (isEnrolled) {
                          return (
                            <Link
                              href={`/Courses/${course._id}/Home`}
                              className="btn btn-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Go
                            </Link>
                          );
                        }
                        return (
                          <button className="btn btn-primary" disabled>
                            Go
                          </button>
                        );
                      })()}
                      {(() => {
                        const isEnrolled = enrollments.some(
                          (e: any) =>
                            e.user === currentUser?._id &&
                            e.course === course._id
                        );
                        if (currentUser?.role === "FACULTY") {
                          return isEnrolled ? (
                            <>
                              <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  setCourse(course);
                                  setModalMode("edit");
                                  setEditableCourse({ ...course });
                                  setShowModal(true);
                                }}
                                className="btn btn-warning me-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  dispatch(deleteCourse(course._id));
                                }}
                                className="btn btn-danger"
                                id="wd-delete-course-click"
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                dispatch({
                                  type: "enrollments/enroll",
                                  payload: {
                                    user: currentUser._id,
                                    course: course._id,
                                  },
                                });
                              }}
                            >
                              Enroll
                            </button>
                          );
                        }
                        // Student/other users
                        return isEnrolled ? (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch({
                                type: "enrollments/unenroll",
                                payload: {
                                  user: currentUser?._id,
                                  course: course._id,
                                },
                              });
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch({
                                type: "enrollments/enroll",
                                payload: {
                                  user: currentUser?._id,
                                  course: course._id,
                                },
                              });
                            }}
                          >
                            Enroll
                          </button>
                        );
                      })()}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-muted">Sign in to view your courses.</div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Add New Course" : "Edit Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            className="mb-2"
            placeholder="Course name"
            value={editableCourse.name || ""}
            onChange={(e) =>
              setEditableCourse({ ...editableCourse, name: e.target.value })
            }
          />
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Course description"
            value={editableCourse.description || ""}
            onChange={(e) =>
              setEditableCourse({
                ...editableCourse,
                description: e.target.value,
              })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (modalMode === "add") {
                dispatch(addNewCourse(editableCourse));
                setCourse(editableCourse);
              } else {
                dispatch(updateCourse(editableCourse));
                setCourse(editableCourse);
              }
              setShowModal(false);
            }}
          >
            {modalMode === "add" ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
