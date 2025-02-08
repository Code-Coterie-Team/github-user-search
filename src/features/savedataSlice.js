import { createSlice} from "@reduxjs/toolkit";


const saveBoardSlice=createSlice({
    name:'boardsave',
    initialState:{
       
        boardsave:[
            {
              "Name": "Platform Launch",
              "columns": [
                {
                  "name": "TODO",
                  "tasks": [
                    {
                      "title": "Build UI for onboarding flow",
                      "description": "No description",
                      "subtasks": [
                        "welcome page"
                      ]
                    },
                    {
                      "title": "Build UI for search",
                      "description": "",
                      "subtasks": [
                        "search page"
                      ]
                    },
                    {
                      "title": "Build settings UI",
                      "description": "",
                      "subtasks": [
                        "account page"
                      ]
                    },
                    {
                      "title": "QA and test all major user journeys",
                      "description": "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gap",
                      "subtasks": [
                        []
                      ]
                    }
                  ]
                },
                {
                  "name": "DOING",
                  "tasks": [
                    {
                      "title": "Design settings and search pages",
                      "description": "",
                      "subtasks": [
                        "setting account page"
                      ]
                    },
                    {
                      "title": "Add account management endpoints",
                      "description": "",
                      "subtasks": [
                        "update payment method"
                      ]
                    },
                    {
                      "title": "Design onboarding flow",
                      "description": "",
                      "subtasks": [
                        "sign in page"
                      ]
                    },
                    {
                      "title": "Design onboarding flow",
                      "description": "",
                      "subtasks": [
                        "welcome page"
                      ]
                    },
                    {
                      "title": "Add search enpoints",
                      "description": "",
                      "subtasks": [
                        "add "
                      ]
                    },
                    {
                      "title": "Add authentication endpoints",
                      "description": "",
                      "subtasks": [
                        []
                      ]
                    },
                    {
                      "title": "Research pricing points of various competitors and trial different business models",
                      "description": "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                      "subtasks": [
                        []
                      ]
                    }
                  ]
                },
                {
                  "name": "Done",
                  "tasks": [
                    {
                      "title": "Conduct 5 wireframe tests",
                      "description": "Ensure the layout continues to make sense and we have strong buy-in from potential users.  Subtasks (1 of 1)",
                      "subtasks": [
                        []
                      ]
                    },
                    {
                      "title": "Create wireframe prototype",
                      "description": "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
                      "subtasks": [
                        []
                      ]
                    },
                    {
                      "title": "Review results of usability tests and iterate",
                      "description": "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
                      "subtasks": [
                        "conduct 5 usibility"
                      ]
                    },
                    {
                      "title": "Create paper prototypes and conduct 10 usability tests with potential customers",
                      "description": "",
                      "subtasks": [
                        "create paper"
                      ]
                    },
                    {
                      "title": "Market discovery",
                      "description": "",
                      "subtasks": [
                        "iterview"
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "Name": "Marketing Plan",
              "columns": [
                {
                  "name": "TODO",
                  "tasks": []
                },
                {
                  "name": "Doing",
                  "tasks": []
                }
              ]
            },
            {
              "Name": "Roadmap",
              "columns": [
                {
                  "name": "NOW",
                  "tasks": []
                },
                {
                  "name": "NEXT",
                  "tasks": []
                },
                {
                  "name": "LATER",
                  "tasks": []
                }
              ]
            }
          ]
            
    },
    reducers:{
        setSaveboard:(state,action)=>{
            state.boardsave=action.payload ;
        },
        
}});
export const {setSaveboard}=saveBoardSlice.actions    
export default saveBoardSlice.reducer;
