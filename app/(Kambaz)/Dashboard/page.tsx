"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userClient from "../Account/client";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "../Enrollments/reducer";
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
  const dispatch = useDispatch();
  const [enrolling, setEnrolling] = useState(false);

  const findCoursesForUser = async () => {
    try {
      if (!currentUser) return;
      const courses = await userClient.findCoursesForUser(currentUser._id);
      // All courses from findCoursesForUser are enrolled, so set enrolled flag
      const coursesWithEnrolledFlag = courses.map((course: any) => ({
        ...course,
        enrolled: true,
      }));
      dispatch(setCourses(coursesWithEnrolledFlag));
    } catch (error) {
      console.error("Error fetching courses for user:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      if (!currentUser) return;
      if (enrolling) {
        const allCourses = await client.fetchAllCourses();
        const enrolledCourses = await userClient.findCoursesForUser(
          currentUser._id
        );
        const enrolledCourseIds = enrolledCourses.map((c: any) => c._id);
        const coursesWithEnrolledFlag = allCourses.map((course: any) => ({
          ...course,
          enrolled: enrolledCourseIds.includes(course._id),
        }));
        dispatch(setCourses(coursesWithEnrolledFlag));
      } else {
        await findCoursesForUser();
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (!currentUser) return;
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      // Update local state
      const newCourses = courses.map((course: any) =>
        course._id === courseId ? { ...course, enrolled } : course
      );
      dispatch(setCourses(newCourses));

      // Refresh enrollments in Redux store for CoursesLayout to work correctly
      try {
        const updatedEnrollments =
          await enrollmentsClient.findEnrollmentsForUser();
        dispatch(setEnrollments(updatedEnrollments));
      } catch (error) {
        console.error("Error refreshing enrollments:", error);
      }

      // If not in enrolling mode, refresh the courses list to reflect changes
      if (!enrolling) {
        await findCoursesForUser();
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const onAddNewCourse = async (course: any) => {
    try {
      const newCourse = await client.createCourse(course);
      // New course is automatically enrolled
      const courseWithEnrolled = { ...newCourse, enrolled: true };
      dispatch(setCourses([...courses, courseWithEnrolled]));
    } catch (error) {
      console.error("Error creating course:", error);
      // Optionally show user-friendly error message
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(
        setCourses(courses.filter((course: any) => course._id !== courseId))
      );
    } catch (error) {
      console.error("Error deleting course:", error);
      // Optionally show user-friendly error message
    }
  };

  const onUpdateCourse = async (course: any) => {
    try {
      await client.updateCourse(course);
      dispatch(
        setCourses(
          courses.map((c: any) => {
            if (c._id === course._id) {
              return course;
            } else {
              return c;
            }
          })
        )
      );
    } catch (error) {
      console.error("Error updating course:", error);
      // Optionally show user-friendly error message
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (enrolling) {
        fetchCourses();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

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
              onClick={() => setEnrolling(!enrolling)}
            >
              {enrolling ? "My Courses" : "All Courses"}
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
          : enrolling
          ? `Published Courses (${courses.length})`
          : `Enrolled Courses (${courses.length})`}
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        {currentUser ? (
          <Row xs={1} md={5} className="g-4">
            {courses.map((course: any) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card className="h-100" style={{ height: 380 }}>
                  {(() => {
                    // Check if user can access this course (enrolled or faculty)
                    // When enrolling is false, all courses are enrolled (from findCoursesForUser)
                    // When enrolling is true, check the enrolled flag
                    const canAccess =
                      currentUser &&
                      (!enrolling ||
                        course.enrolled ||
                        currentUser.role === "FACULTY");
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
                      // Check if user can access this course (enrolled or faculty)
                      // When enrolling is false, all courses are enrolled (from findCoursesForUser)
                      // When enrolling is true, check the enrolled flag
                      const canAccess =
                        currentUser &&
                        (!enrolling ||
                          course.enrolled ||
                          currentUser.role === "FACULTY");
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
                        // When enrolling is false, all courses shown are enrolled
                        // When enrolling is true, check the enrolled flag
                        const isEnrolled =
                          !enrolling || course.enrolled || false;
                        if (isEnrolled || currentUser?.role === "FACULTY") {
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
                        const isEnrolled = course.enrolled || false;
                        if (currentUser?.role === "FACULTY") {
                          return (
                            <>
                              {isEnrolled && (
                                <>
                                  <button
                                    id="wd-edit-course-click"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      event.stopPropagation();
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
                                      onDeleteCourse(course._id);
                                    }}
                                    className="btn btn-danger"
                                    id="wd-delete-course-click"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                              {/* Enroll button for faculty when viewing All Courses and NOT enrolled */}
                              {enrolling && !isEnrolled && (
                                <button
                                  className="btn btn-success float-end"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    updateEnrollment(course._id, true);
                                  }}
                                >
                                  Enroll
                                </button>
                              )}
                            </>
                          );
                        }
                        // Enroll/Unenroll buttons for non-faculty - only show when enrolling is true
                        if (enrolling) {
                          return (
                            <button
                              className={`btn ${
                                isEnrolled ? "btn-danger" : "btn-success"
                              } float-end`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateEnrollment(course._id, !isEnrolled);
                              }}
                            >
                              {isEnrolled ? "Unenroll" : "Enroll"}
                            </button>
                          );
                        }
                        return null;
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
            onClick={async () => {
              if (modalMode === "add") {
                await onAddNewCourse(editableCourse);
              } else {
                await onUpdateCourse(editableCourse);
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
