import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
      id: 1, title: "NodeJS Assignment",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course:"New Course",
  });
  const handleChanges=(e:any)=> {

    const {value, checked}=e.target;
    if(checked){
      setAssignment({...assignment,completed:true});
    }
    else{
      setAssignment({...assignment,completed:false});
    }
  }
  const API_BASE = process.env.REACT_APP_API_BASE;
  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;
  const MODULE_URL = `${API_BASE}/a5/module`;

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);


  return (
    <div>
      <h3>Working With Objects</h3>
      
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>

      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
      
      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>

      <h4>Modifying Properties</h4>
      <input type="text"
      onChange={(e)=>setAssignment({...assignment,
          title:e.target.value })}
      value={assignment.title}/>
      <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <br/> <br/>

      <input type="number"
      onChange={(e)=>setAssignment({...assignment,
          score:parseInt(e.target.value) })}
      value={assignment.score}/>
      <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <br/> <br/>

      <div>
        <input type="checkbox"
          onChange={handleChanges}
          />
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/score/${assignment.completed}`}>
          Completed
        </a>
      </div>



      <h4>Modules</h4>
      <a className="btn btn-warning" href="API_BASE/a5/module">Get Module</a>
      <a className="btn btn-info" href="API_BASE/a5/module/name">Get Module Name</a><br/><br/>
      <input type="text"
        onChange={(e)=>setModule({...module,
          name:e.target.value })}
        value={module.name}/>
      <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
        Update Name
      </a>
    </div>
  );
}
export default WorkingWithObjects;