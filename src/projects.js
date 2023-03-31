import React, {useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import store from './store';
import axios from "axios";
import ReadOnlyProjectRow from './ReadOnlyProjectRow';
import EditableProjectRow from './EditableProjectRow';

const http = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-type": "application/json"
    }
});

export const Projects = () => {
    // const [project_data, setProjectData] = useState([]);
    // const [issue_data, updateIssueData] = useState([]);
    // const [action_data, updateActionData] = useState([]);
    const [new_project_data, updateNewProjectData] = useState({'name':'','description':'','budget':''});
    const [edit_project_id, UpdateEditProjectId] = useState(null);

    const analysis = useSelector(state => state.analysis);
    let project_data = analysis.projects;
    // console.log(analysis);
    
    useEffect(()=> {
      console.log(analysis);
    }, [analysis])

    const loadProjectOverview = (project) => {
      let id = project.id;
      console.log(id);
      // store.dispatch({
      //   type: "UPDATE_CURR_PROJECT",
      //   payload: id
      // });
    }

    function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
      console.log(e);
      
      insertProject(new_project_data);
    }

    const insertProject = async (project_object) => {
      console.log(`Try Insert: ${JSON.stringify(project_object)}`);
      const data =  await axios.post('/project',project_object).then( (resoponse) => {
        console.log(`resoponse: ${JSON.stringify(resoponse)}`);
        store.dispatch({
          type: "ADD_PROJECT",
          payload: resoponse.data[0]
        });
        return data.data;
      })
      .catch( (error) =>{
        console.log(`error: ${error}`);
      });

      
      // console.log(`data: ${data}`);
    }


  const handleEditClick = (event, project) => {
    event.preventDefault();
    UpdateEditProjectId(project.id);
  }


    function handleChange(e) {
      e.preventDefault();
      // updateNewProjectData(e.target.value);
      // console.log(`You changeed a ${e.target.name}`);
      // console.log(e);
      let value = e.target.value;
      if(e.target.name == 'name'){
        new_project_data.name = value;
      }
      if(e.target.name == 'description'){
        new_project_data.description = value;
      }
      if(e.target.name == 'budget'){
        new_project_data.budget = value;
      }

      updateNewProjectData(new_project_data);
      console.log('newProjectData' + JSON.stringify(new_project_data));
      // store.dispatch({
      //   type: "ADD_PROJECT",
      //   payload: id
      // });
    }

    // const dispatch = useDispatch();

      return (
        <div>
          <form>
            <table className="fl-table" id="profiles-list">
                <thead>
                    <tr className="search-list-headers">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {(typeof project_data === 'undefined') ? (
                    <p>Please Wait</p>
                    ) : (
                        project_data.map((item,index) =>(
                        // <tr key={index} onClick={loadProjectOverview(item)}><td><Link to={`/project_overview?project_id=${item.id}`}>{item.id}</Link></td><td>{item.name}</td><td>{item.description}</td><td>{item.budget}</td></tr>
                        <Fragment>
                          {edit_project_id === item.id ? <EditableProjectRow item ={item} index={index}/> : <ReadOnlyProjectRow item ={item} index={index} handleEditClick={handleEditClick}/>}    
                        </Fragment>
                        ) 
                        )
                    )}
                    <tr><td><button onClick={handleSubmit}>Add Project</button></td><td><input name='name' type="text" onChange={handleChange}/></td><td><input name='description' type="text" onChange={handleChange}/></td><td><input name='budget' type="text" onChange={handleChange}/></td></tr>
                </tbody>
                

            </table>
          </form>      
        </div>
      )
}


export default Projects