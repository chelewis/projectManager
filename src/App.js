import React, {useState, useEffect} from 'react';
import Projects from './projects';
import ProjectOverview from './projectOverview';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './store';

function App() {
  const [view, updateView] = useState('');
  const [project_data, setProjectData] = useState([]);
  const [issue_data, updateIssueData] = useState([]);
  const [action_data, updateActionData] = useState([]);
  const [risk_data, updateRiskData] = useState([]);
  const [current_active_project, updateCurrentProject] = useState(-1);

  useEffect(()=> {
    fetch("/projects").then(
      res => res.json()
    ).then(
      data => {
        setProjectData(data);
        store.dispatch({
          type: "LOAD_PROJECTS",
          payload: data
        });
        // console.log(project_data);
      }
    )
  }, [])

  useEffect(()=> {
    fetch("/actions").then(
      res => res.json()
    ).then(
      data => {
        updateActionData(data);
        store.dispatch({
          type: "LOAD_ACTIONS",
          payload: data
        });
        // console.log(data);
      }
    )
  }, [])

  useEffect(()=> {
    fetch("/issues").then(
      res => res.json()
    ).then(
      data => {
        updateIssueData(data);
        store.dispatch({
          type: "LOAD_ISSUES",
          payload: data
        });
        console.log(data);
      }
    )
  }, [])

  useEffect(()=> {
    fetch("/risks").then(
      res => res.json()
    ).then(
      data => {
        updateRiskData(data);
        store.dispatch({
          type: "LOAD_RISKS",
          payload: data
        });
      }
    )
  }, [])


  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Projects />} />
          <Route path='/project_list' element={<Projects />} />
          <Route path='/project_overview' element={<ProjectOverview />} />
        </Routes>
    </BrowserRouter>
      // <div>
      //   <div>
      //     <Projects/>
      //   </div>
      // </div>
  )
}

export default App