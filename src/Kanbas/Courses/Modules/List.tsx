import { useEffect, useState } from "react";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

import "./index.css";

function ModuleList() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courseId) return;

    client.findModulesForCourse(courseId).then((modules) => {
      dispatch(setModules(modules));
    });
  }, []);

  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );

  const handleAddModule = () => {
    if (!courseId) return;
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const [selectedModule, setSelectedModule] = useState(module);

  return (
    <div className="flex-fill">
      <div className="d-flex justify-content-end border-2 border-bottom pb-3">
        <button className="btn btn-light m-1">Collapse All</button>
        <button className="btn btn-light m-1"> View Progress</button>
        <button className="btn btn-light dropdown-toggle m-1 d-flex justify-content-center align-items-center">
          <CiCircleCheck className="text-success me-2" fontSize="1.2em" />
          Publish All
        </button>
        <button className="btn btn-danger m-1"> + Module</button>
        <button className="btn btn-light m-1 d-flex justify-content-center align-items-center">
          <FaEllipsisV />
        </button>
      </div>

      <div className="my-2 p-1" style={{ width: 400 }}>
        <h4>Add a new module</h4>
        <div>
          <input
            className="form-control my-1"
            value={module.name}
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
          />
        </div>
        <div>
          <textarea
            className="form-control my-1"
            value={module.description}
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
        </div>

        <div>
          <button
            onClick={handleAddModule}
            className="btn btn-sm btn-success me-1"
          >
            Add
          </button>
          <button
            onClick={handleUpdateModule}
            className="btn btn-sm btn-secondary ms-1"
          >
            Update
          </button>
        </div>
      </div>

      <ul className="list-group wd-modules mt-5">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module) => (
            <li className="list-group-item cursor-pointer" key={module._id}>
              <div className="module-header py-3 bg-light">
                <span className="me-2 ms-1 cursor-pointer">
                  <FaEllipsisV className="mb-1" fontSize="1.1em" />
                </span>
                <div
                  className="d-inline-flex align-items-center cursor-pointer"
                  onClick={() => setSelectedModule(module)}
                >
                  {selectedModule._id === module._id ? (
                    <HiChevronDown className="fs-18" />
                  ) : (
                    <HiChevronRight className="fs-18" />
                  )}
                  <span
                    className="fw-bold cursor-pointer"
                    style={{ marginRight: "auto" }}
                  >
                    {module.name}
                  </span>
                </div>
                <span className="float-end pe-2 d-flex align-items-center">
                  <button
                    onClick={() => dispatch(setModule(module))}
                    className="btn btn-primary btn-sm rounded-2 p-1 me-1"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm rounded-2 p-1 me-2"
                    onClick={() => {
                      handleDeleteModule(module._id);
                    }}
                  >
                    Delete
                  </button>
                  <button className="dropdown-toggle me-3 bg-transparent d-inline-flex align-items-center justify-content-center">
                    <FaCheckCircle fontSize="1em" className="text-success" />
                  </button>
                  <GoPlus
                    color="gray"
                    className="cursor-pointer me-4 mb-1"
                    fontSize="1.3em"
                  />
                  <FaEllipsisV
                    className="mb-1 cursor-pointer"
                    fontSize="1.1em"
                  />
                </span>
              </div>

              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson) => (
                    <li className="list-group-items module-li" key={lesson._id}>
                      <div className="py-2">
                        <span className="me-2 ms-1">
                          <FaEllipsisV className="mb-1" />
                          <FaEllipsisV
                            className="mb-1"
                            style={{ marginLeft: -10.5 }}
                          />
                        </span>
                        <span className="module-content p-4">
                          <Link
                            to="#"
                            className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                          >
                            {lesson.name}
                          </Link>
                          <span className="float-end pe-2">
                            <FaCheckCircle
                              fontSize="1em"
                              className="text-success me-3 cursor-pointer mb-1"
                            />
                            <FaEllipsisV className="ms-2 cursor-pointer mb-1" />
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ModuleList;
