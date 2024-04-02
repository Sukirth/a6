import { useNavigate, useParams } from "react-router";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { PiNotePencil } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { Assignment } from "../../../types";
import {
  deleteAssignment,
  setAssignment,
  initialState as initialAssignmentState,
  setAssignments,
} from "./reducer";
import { useEffect, useState } from "react";
import * as client from "./client";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courseId) return;

    client.findAssignmentsForCourse(courseId).then((assignments) => {
      dispatch(setAssignments(assignments));
    });
  }, []);

  const assignmentList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );

  const filteredAssignments = assignmentList.filter(
    (assignment) => assignment.course === courseId
  );

  const [showDialog, setShowDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const navigateToAssignment = (assignment: Assignment) => {
    dispatch(setAssignment(assignment));
    navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
  };

  const handleDeleteModule = () => {
    client.deleteAssignment(selectedAssignment).then((status) => {
      dispatch(deleteAssignment(selectedAssignment));
      handleCloseDialog();
    });
  };

  const createAssignment = () => {
    dispatch(setAssignment(initialAssignmentState.assignment));
    navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
  };

  return (
    <>
      <div className="me-5 mt-5">
        <div className="d-flex justify-content-between px-1">
          <div className="input-group d-flex align-self-center w-25">
            <span className="input-group-text" id="basic-addon1">
              <CiSearch />
            </span>
            <input
              type="text"
              className="form-control d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none border"
              placeholder="Search for Assignment"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="d-flex">
            <button className="btn btn-light m-1">+Group</button>
            <button onClick={createAssignment} className="btn btn-danger m-1">
              + Assignment
            </button>
            <button className="btn btn-light m-1 d-flex justify-content-center align-items-center">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        {filteredAssignments.length ? (
          <ul className="list-group wd-modules">
            <li className="list-group-items">
              <div className="module-header py-3">
                <span className="me-2 ms-1">
                  <FaEllipsisV className="mb-1" />
                  <FaEllipsisV className="mb-1" style={{ marginLeft: -10.5 }} />
                </span>
                <div className="d-inline-flex align-items-center justify-content-center">
                  <button className="btn dropdown-toggle me-2" />
                  <span className="fw-bold cursor-pointer">Assignments</span>
                </div>
                <span className="float-end pe-3 mb-1">
                  <span className="border-dark-subtle rounded-pill fs-12 border p-2">
                    40% of Total
                  </span>
                  <i className="me-2 ms-1 cursor-pointer" />
                  <FaEllipsisV className="mb-1" />
                </span>
              </div>
              <ul className="list-group">
                {filteredAssignments.map((assignment) => {
                  return (
                    <li
                      key={assignment._id}
                      className="list-group-items assignment-li"
                    >
                      <div className="module-content fw-bold d-flex justify-content-center align-items-center ms-1 py-2">
                        <span>
                          <FaEllipsisV className="mb-1" />
                          <FaEllipsisV
                            className="mb-1"
                            style={{ marginLeft: -10.5 }}
                          />
                          <PiNotePencil className="text-success fs-24 mx-4" />
                        </span>
                        <span className="w-350 me-auto">
                          <span
                            onClick={() => navigateToAssignment(assignment)}
                            className="text-decoration-underline cursor-pointer"
                          >
                            {assignment.name}
                          </span>
                          <br />
                          <span>
                            <Link
                              to="#"
                              className="fw-normal fs-12 link-danger link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                            >
                              Multiple Modules
                            </Link>
                            <span className="fw-normal fs-16"> | </span>
                            <span className="fw-normal fs-12">
                              {!!assignment.availableFromDate && (
                                <span>
                                  <span className="fw-bold">
                                    Not available until
                                  </span>{" "}
                                  {assignment.availableFromDate}
                                  <span className="fw-normal fs-16"> | </span>
                                </span>
                              )}
                              <span className="fw-bold"> Due</span>
                              {" " + assignment.dueDate}
                              <span className="fw-normal fs-16"> | </span>
                              {assignment.totalPoints} pts
                            </span>
                          </span>
                        </span>
                        <span className="me-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleShowDialog();
                              setSelectedAssignment(assignment._id);
                            }}
                            className="btn btn-danger btn-sm rounded-2 p-1"
                          >
                            Delete
                          </button>
                        </span>
                        <span className="pe-3">
                          {assignment.published ? (
                            <FaCheckCircle
                              fontSize="1em"
                              className="text-success me-3 opacity-50"
                            />
                          ) : (
                            <FaCheckCircle
                              fontSize="1em"
                              className="text-success me-3"
                            />
                          )}
                          <FaEllipsisV className="mb-1" />
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        ) : (
          <div className="w-full text-center fs-4 mt-3">No Assignments</div>
        )}
      </div>
      {showDialog && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dialog Title</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this assignmen</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteModule}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDialog && <div className="modal-backdrop show"></div>}
    </>
  );
}

export default Assignments;
