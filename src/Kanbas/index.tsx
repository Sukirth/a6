import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import Account from "./Account";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { Course } from "../types";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);

  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };

  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Course Number",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    image: "default.png",
  });

  const addNewCourse = async () => {
    const totalNoOfCourses = courses.length;
    const commonText = `2042${(totalNoOfCourses + 1) * 10}`;
    const cardText = `${course.number}_12631_${commonText}`;
    const newCourse: Course = {
      ...course,
      _id: new Date().getTime().toString(),
      cardText,
      cardSubText: `${commonText}_1 Fall Semester Full Term`,
    };

    const response = await axios.post(COURSES_API, newCourse);
    setCourses([...courses, response.data]);
  };

  const deleteCourse = async (courseId: string) => {
    await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    const totalNoOfCourses = courses.length;
    const commonText = `2042${(totalNoOfCourses + 1) * 10}`;
    const cardText = `${course.number}_12631_${commonText}`;

    const updatedCourse = {
      ...course,
      cardText,
      cardSubText: `${commonText}_1 Fall Semester Full Term`,
    };

    await axios.put(`${COURSES_API}/${course._id}`, updatedCourse);

    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return updatedCourse;
        }
        return c;
      })
    );
  };

  return (
    <Provider store={store}>
      <div className="d-flex overflow-hidden">
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route
              path="Courses/:courseId/*"
              element={<Courses courses={courses} />}
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
