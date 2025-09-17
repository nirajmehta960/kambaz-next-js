import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (3)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="React JS course"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image
              src="/images/nextjs.jpg"
              width={200}
              height={150}
              alt="Next.js Essentials course"
            />
            <div>
              <h5> CS1235 Next.js Essentials </h5>
              <p className="wd-dashboard-course-title">
                Learn the fundamentals of Next.js
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image
              src="/images/advwebdev.jpg"
              width={200}
              height={150}
              alt="Advanced Web Dev course"
            />
            <div>
              <h5> CS1236 Advanced Web Dev </h5>
              <p className="wd-dashboard-course-title">
                Deep dive into modern web development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
