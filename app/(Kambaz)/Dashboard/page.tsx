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
} from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const courses = db.courses;

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
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={getCourseImage(course._id)}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
