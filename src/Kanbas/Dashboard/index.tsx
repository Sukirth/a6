import { Link } from "react-router-dom";
import { PiNotePencil } from "react-icons/pi";
import "./index.css";
import { Course } from "../../types";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  console.log(course);
  return (
    <div className="p-4">
      <h1>Dashboard</h1> <hr />
      <div style={{ width: 400 }} className="my-3">
        <h4>Add New Course</h4>
        <input
          placeholder="Course Name"
          value={course.name}
          className="form-control my-1"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <input
          placeholder="Course Number"
          value={course.number}
          className="form-control my-1"
          onChange={(e) => setCourse({ ...course, number: e.target.value })}
        />
        <input
          value={course.startDate ? course.startDate.split("T")[0] : ""}
          className="form-control my-1"
          type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        />
        <input
          value={course.endDate ? course.endDate.split("T")[0] : ""}
          className="form-control my-1"
          type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
        />
        <div className="mt-2">
          <button
            className="btn btn-primary btn-sm me-1"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-primary btn-sm ms-1"
            onClick={updateCourse}
          >
            Update
          </button>
        </div>
      </div>
      <h2>Published Courses ({courses.length})</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {!!courses.length ? (
            courses.map((course) => (
              <div key={course._id} className="col" style={{ width: 300 }}>
                <div className="card" style={{ height: 360 }}>
                  <div className="d-inline-block position-absolute position-ellipsis fs-24 text-light">
                    <i className="fa fa-ellipsis-v" />
                  </div>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                    <img
                      src={`/images/${course.image}`}
                      className="card-img-top"
                      style={{ height: 150 }}
                      alt={course.name + " image"}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-14"
                      to={`/Kanbas/Courses/${course._id}/Home`}
                    >
                      {course.name}
                      <p className="card-text fs-15 link-dark">
                        {course.cardText}
                        <br />
                        <span className="fs-12">{course.cardSubText}</span>
                      </p>
                    </Link>
                    <div className="my-1">
                      <button
                        className="btn btn-sm btn-danger me-1"
                        onClick={() => {
                          deleteCourse(course._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setCourse(course);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/Kanbas/Courses/${course._id}/Home`}
                    >
                      <PiNotePencil fontSize="1.5em" className="mt-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="fs-4">No published courses :(</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
