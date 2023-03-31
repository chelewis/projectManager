import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from './store';
import axios from "axios";


export const ProjectOverview = () => {
    

    const url_params = new URLSearchParams(window.location.search);
    const project_id = parseInt(url_params.get('project_id'));
    const analysis = useSelector(state => state.analysis);

    const [new_issue_data, updateNewIssueData] = useState({'name':'','description':'','status':'','project_id':project_id});
    const [new_action_data, updateNewActionData] = useState({'name':'','description':'','status':'','project_id':project_id});
    const [new_risk_data, updateNewRiskData] = useState({'name':'','description':'','status':'','project_id':project_id});
    const [edit_project_id, UpdateEditProjectId] = useState(null);
    
    
    console.log(analysis);

    const project_info = analysis.projects.filter(function (el) {
        return el.id === project_id
    });
    let project = project_info[0];

    // console.log(project_info[0]);
    const issue_info = analysis.issues.filter(function (el) {
        return el.project_id === project_id
    });
    // console.log(issue_info);
    const action_info = analysis.actions.filter(function (el) {
        return el.project_id === project_id
    });
    const risk_info = analysis.risks.filter(function (el) {
        return el.project_id === project_id
    });


    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        console.log(e);
        let submit_type = e.target.name;
        if(submit_type === 'issue_submit'){
            insertIssue(new_issue_data);
            // store.dispatch({
            //   type: "ADD_ISSUE",
            //   payload: new_issue_data
            // });
        }
        if(submit_type === 'action_submit'){
            insertAction(new_action_data);
            // store.dispatch({
            //   type: "ADD_ACTION",
            //   payload: new_action_data
            // });
        }
        if(submit_type === 'risk_submit'){
            insertRisk(new_risk_data);
            // store.dispatch({
            //   type: "ADD_RISK",
            //   payload: new_risk_data
            // });
        }

        // insertProject(new_project_data);
        // console.log(`resoponse: ${JSON.stringify(res)}`);
  
        // store.dispatch({
        //   type: "ADD_PROJECT",
        //   payload: new_project_data
        // });
    }

    function handleChange(e) {
        e.preventDefault();
        // updateNewProjectData(e.target.value);
        // console.log(`You changeed a ${e.target.name}`);
        // console.log(e);
        let last_edit = {};

        let value = e.target.value;
        
        //issue handlers
        if(e.target.name === 'issue_name'){
            new_issue_data.name = value;
            last_edit = new_issue_data;
            updateNewIssueData(new_issue_data);
        }
        if(e.target.name === 'issue_description'){
            new_issue_data.description = value;
            last_edit = new_issue_data;
            updateNewIssueData(new_issue_data);
        }
        if(e.target.name === 'issue_status'){
            new_issue_data.status = value;
            last_edit = new_issue_data;
            updateNewIssueData(new_issue_data);
        }

        //action handlers
        if(e.target.name === 'action_name'){
            new_action_data.name = value;
            last_edit = new_action_data;
            updateNewActionData(new_action_data);
        }
        if(e.target.name === 'action_description'){
            new_action_data.description = value;
            last_edit = new_action_data;
            updateNewActionData(new_action_data);
        }
        if(e.target.name === 'action_status'){
            new_action_data.status = value;
            last_edit = new_action_data;
            updateNewActionData(new_action_data);
        }

        //risk handlers
        if(e.target.name === 'risk_name'){
            new_risk_data.name = value;
            last_edit = new_risk_data;
            updateNewRiskData(new_risk_data);
        }
        if(e.target.name === 'risk_description'){
            new_risk_data.description = value;
            last_edit = new_risk_data;
            updateNewRiskData(new_risk_data);
        }
        if(e.target.name === 'risk_status'){
            new_risk_data.status = value;
            last_edit = new_risk_data;
            updateNewRiskData(new_risk_data);
        }
  
        // updateNewProjectData(last_edit);
        console.log('Last Change: ' + JSON.stringify(last_edit));

    }

    const insertIssue = async (issue_object) => {
        console.log(`Try Insert: ${JSON.stringify(issue_object)}`);
        const data =  await axios.post('/issue',issue_object).then( (resoponse) => {
          console.log(`resoponse: ${JSON.stringify(resoponse)}`);
          store.dispatch({
            type: "ADD_ISSUE",
            payload: resoponse.data[0]
          });
          return true;
        })
        .catch( (error) =>{
          console.log(`error: ${error}`);
          return false
        });
    }

    const insertAction = async (action_object) => {
        console.log(`Try Insert: ${JSON.stringify(action_object)}`);
        const data =  await axios.post('/action',action_object).then( (resoponse) => {
          console.log(`resoponse: ${JSON.stringify(resoponse)}`);
          store.dispatch({
            type: "ADD_ACTION",
            payload: resoponse.data[0]
          });
          return true;
        })
        .catch( (error) =>{
          console.log(`error: ${error}`);
          return false;
        });
    }

    const insertRisk = async (risk_object) => {
        console.log(`Try Insert: ${JSON.stringify(risk_object)}`);
        const data =  await axios.post('/risk',risk_object).then( (resoponse) => {
          console.log(`resoponse: ${JSON.stringify(resoponse)}`);
          store.dispatch({
            type: "ADD_RISK",
            payload: resoponse.data[0]
          });
          return true;
        })
        .catch( (error) =>{
          console.log(`error: ${error}`);
          return false;
        });
    }

      return (
        <div>
            Project Overview for {project_id}
            {(typeof project === 'undefined') ? (
                <p>Loading...</p>
            )
            :
            (<div>
                <h1>{project_info[0].name}</h1>
                <p>{project_info[0].description}</p>
                <h3>{project_info[0].budget}</h3>
                <hr/>
                <div>
                    <table className="fl-table" id="profiles-list">
                        <thead>
                            <tr className="search-list-headers">
                                <th></th>
                                <th>Issue</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issue_info.map((item,index) =>(
                            <tr key={index} onClick={() => console.log('issue clicked')}><td></td><td>{item.name}</td><td>{item.description}</td><td>{item.status}</td></tr>
                            )
                            )}
                            <tr><td><button name='issue_submit' onClick={handleSubmit}>Add Issue</button></td><td><input name='issue_name' type="text" onChange={handleChange}/></td><td><input name='issue_description' type="text" onChange={handleChange}/></td><td><input name='issue_status' type="text" onChange={handleChange}/></td></tr>
                        </tbody>
                    </table>
                </div>
                <hr/>
                <div>
                    <table className="fl-table" id="profiles-list">
                        <thead>
                            <tr className="search-list-headers">
                            <th></th>
                                <th>Action</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {action_info.map((item,index) =>(
                            <tr key={index} onClick={() => console.log('action clicked')}><td></td><td>{item.name}</td><td>{item.description}</td><td>{item.status}</td></tr>
                            )
                            )}
                            <tr><td><button name='action_submit' onClick={handleSubmit}>Add Action</button></td><td><input name='action_name' type="text" onChange={handleChange}/></td><td><input name='action_description' type="text" onChange={handleChange}/></td><td><input name='action_status' type="text" onChange={handleChange}/></td></tr>
                        </tbody>
                    </table>
                </div>
                <hr/>
                <div>
                    <table className="fl-table" id="profiles-list">
                        <thead>
                            <tr className="search-list-headers">
                                <th></th>
                                <th>Risk</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {risk_info.map((item,index) =>(
                            <tr key={index} onClick={() => console.log('risk clicked')}><td></td><td>{item.name}</td><td>{item.description}</td><td>{item.status}</td></tr>
                            )
                            )}
                            <tr><td><button name='risk_submit' onClick={handleSubmit}>Add Risk</button></td><td><input name='risk_name' type="text" onChange={handleChange}/></td><td><input name='risk_description' type="text" onChange={handleChange}/></td><td><input name='risk_status' type="text" onChange={handleChange}/></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )
            }
        </div>
      )
}


export default ProjectOverview