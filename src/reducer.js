import { useReducer } from "react";


const initialState = {
    projects:[
        // {
        //     'id': 0,
        //     'name': 'N/A',
        //     'description': 'N/A',
        //     'budget': 0,
        //     'issues':[],
        //     'actions':[],
        //     'risks':[]
        // }
    ],
    issues:[
        // {
        //     'id':0,
        //     'name': 'N/A',
        //     'description': 'N/A',
        //     'status': 'New',
        //     'created_date': '01/01/1990'
        // }
    ],
    actions:[
        // {
        //     'id':0,
        //     'name': 'N/A',
        //     'description': 'N/A',
        //     'status': 'New',
        //     'created_date': '01/01/1990'
        // }
    ],
    risks:[
        // {
        //     'id':0,
        //     'name': 'N/A',
        //     'description': 'N/A',
        //     'status': 'New',
        //     'created_date': '01/01/1990'
        // }
    ],
    current_project: -1
}

export const reducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case "ADD_PROJECT":
            const new_project_info = action.payload;
            let current_project_state = [...state.projects];
            // resoponse = http.post("/project");
            current_project_state.push(new_project_info )
            return {
                ...state,
                projects: current_project_state 
            }
        
        case "LOAD_PROJECTS":
            // new_project_info = action.payload;
            current_project_state = action.payload;
            // current_project_state = action.payload;
            return {
                ...state,
                projects: current_project_state 
            }
        
        
        // case "UPDATE_PROJECT":
        //     return state.map((project) => {
        //     if (project.id === action.id) {
        //         return { ...project, complete: !todo.complete };
        //     } else {
        //         return todo;
        //     }
        //     });
        
        case "LOAD_ISSUES":
            current_project_state = action.payload;
            return {
                ...state,
                issues: current_project_state 
            }
        case "ADD_ISSUE":
            const new_issue_info = action.payload;
            let current_issue_state = [...state.issues];
            // resoponse = http.post("/project");
            current_issue_state.push(new_issue_info )
            return {
                ...state,
                issues: current_issue_state 
            }

        
        case "LOAD_ACTIONS":
            current_project_state = action.payload;
            return {
                ...state,
                actions: current_project_state 
            }
        case "ADD_ACTION":
            const new_action_info = action.payload;
            let current_action_state = [...state.actions];
            // resoponse = http.post("/project");
            current_action_state.push(new_action_info )
            return {
                ...state,
                actions: current_action_state 
            }
        
        case "LOAD_RISKS":
            current_project_state = action.payload;
            return {
                ...state,
                risks: current_project_state 
            }
        case "ADD_RISK":
            const new_risk_info = action.payload;
            let current_risk_state = [...state.risks];
            // resoponse = http.post("/project");
            current_risk_state.push(new_risk_info )
            return {
                ...state,
                risks: current_risk_state 
            }

        
        default:
            return state;
    }
  };

  export default reducer;