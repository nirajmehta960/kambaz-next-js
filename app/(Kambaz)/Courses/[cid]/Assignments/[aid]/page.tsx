"use client";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../reducer";
import { useEffect, useState } from "react";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const existing = assignments.find((a: any) => a._id === aid);
  const isNew = aid === "new" || !existing;
  const isFaculty = currentUser?.role === "FACULTY";
  const [form, setForm] = useState<any>(
    existing || {
      _id: undefined,
      title: "New Assignment",
      description: "",
      points: 100,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      course: courseId,
    }
  );

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const onCreateAssignment = async () => {
    if (!courseId) return;
    try {
      const assignment = await client.createAssignmentForCourse(courseId, form);
      dispatch(setAssignments([...assignments, assignment]));
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const onUpdateAssignment = async () => {
    try {
      await client.updateAssignment(form);
      const newAssignments = assignments.map((a: any) =>
        a._id === form._id ? form : a
      );
      dispatch(setAssignments(newAssignments));
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };
  return (
    <Container fluid id="wd-assignments-editor" className="py-2">
      <Form>
        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={6}>
            <Form.Group controlId="wd-name">
              <Form.Label className="fw-semibold">Assignment Name</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col sm={12} md={8} lg={6}>
            <div className="border rounded p-3">
              <Form.Control
                as="textarea"
                rows={4}
                value={form.description}
                placeholder="New Assignment Description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </div>
          </Col>
        </Row>

        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-points">Points</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
            <Form.Control
              id="wd-points"
              type="number"
              value={form.points}
              onChange={(e) =>
                setForm({ ...form, points: parseInt(e.target.value || "0") })
              }
              readOnly={!isFaculty}
              disabled={!isFaculty}
            />
          </Col>
        </Row>

        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS" disabled={!isFaculty}>
              <option>ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="align-items-center g-3 mb-3">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-display-grade-as">
              Display Grade as
            </Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage" disabled={!isFaculty}>
              <option>Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label htmlFor="wd-submission-type">
              Submission Type
            </Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
            <div className="border rounded p-3">
              <Form.Select
                id="wd-submission-type"
                className="mb-3"
                defaultValue="Online"
                disabled={!isFaculty}
              >
                <option>Online</option>
              </Form.Select>

              <div className="fw-semibold mb-2">Online Entry Options</div>

              <Form.Check
                id="wd-text-entry"
                className="mb-2"
                label="Text Entry"
                disabled={!isFaculty}
              />
              <Form.Check
                id="wd-website-url"
                className="mb-2"
                label="Website URL"
                defaultChecked
                disabled={!isFaculty}
              />
              <Form.Check
                id="wd-media-recordings"
                className="mb-2"
                label="Media Recordings"
                disabled={!isFaculty}
              />
              <Form.Check
                id="wd-student-annotation"
                className="mb-2"
                label="Student Annotation"
                disabled={!isFaculty}
              />
              <Form.Check id="wd-file-upload" label="File Uploads" disabled={!isFaculty} />
            </div>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col sm={3} md={2} className="text-sm-end">
            <Form.Label className="pt-2">Assign</Form.Label>
          </Col>
          <Col sm={9} md={6} lg={4}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to" className="fw-semibold">
                  Assign to
                </Form.Label>
                <Form.Control id="wd-assign-to" defaultValue="Everyone" readOnly={!isFaculty} disabled={!isFaculty} />
              </Form.Group>

              <Row className="g-3">
                <Col xs={12}>
                  <Form.Group controlId="wd-due-date">
                    <Form.Label className="fw-semibold">Due</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.dueDate}
                      onChange={(e) =>
                        setForm({ ...form, dueDate: e.target.value })
                      }
                      readOnly={!isFaculty}
                      disabled={!isFaculty}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-from">
                    <Form.Label className="fw-semibold">
                      Available from
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={form.availableFrom}
                      onChange={(e) =>
                        setForm({ ...form, availableFrom: e.target.value })
                      }
                      readOnly={!isFaculty}
                      disabled={!isFaculty}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="wd-available-until">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control
                      type="date"
                      value={form.availableUntil || ""}
                      onChange={(e) =>
                        setForm({ ...form, availableUntil: e.target.value })
                      }
                      readOnly={!isFaculty}
                      disabled={!isFaculty}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={8} lg={6}>
            <hr className="my-4" />
          </Col>
        </Row>

        <Row>
          <Col sm={3} md={2} />
          <Col
            sm={9}
            md={6}
            lg={4}
            className="d-flex justify-content-end gap-2"
          >
            <Link href={`/Courses/${courseId}/Assignments`}>
              <Button variant="light">Cancel</Button>
            </Link>
            {isFaculty && (
              <Button
                variant="danger"
                onClick={async () => {
                  if (isNew) {
                    await onCreateAssignment();
                  } else {
                    await onUpdateAssignment();
                  }
                  router.push(`/Courses/${courseId}/Assignments`);
                }}
              >
                Save
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
