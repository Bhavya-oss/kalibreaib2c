"use client";

import { getFilters, getJobs } from "@/app/api/ApiHandlers";
import { JOBS_PATH, LOADING_INIT } from "@/constants/TextConstants";
import { createContext, useEffect, useReducer } from "react";

export const MyContext = createContext();

const INTIAL_STATE = {
  job_list: {
    list: [],
    nextPath: null,
    prevPath: null,
    loading: LOADING_INIT,
  },
  filters: {
    list: [],
    loading: LOADING_INIT,
  },
  selectedFilters: {},
  otpErrorStatus: null,
  isAuthenticated: false,
  onbordingQuestions: {
    list: [],
    loading: LOADING_INIT,
  },
  rolesAndSkills: {
    list: [],
  },
  skills: {
    list: [],
    nextPath: null,
  },
  locations: {
    list: [],
    nextPath: null,
  },
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "jobs":
      return {
        ...state,
        job_list: action.payload,
      };
    case "filters":
      return {
        ...state,
        filters: action.payload,
      };
    case "selected_filter":
      return {
        ...state,
        selectedFilters: action.payload,
      };
    case "otpErrorStatus":
      return {
        ...state,
        otpErrorStatus: action.payload,
      };
    case "auth":
      console.log("reducer =====",action)
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "onbordingQuestions":
      return {
        ...state,
        onbordingQuestions: action.payload,
      };
    case "rolesAndSkills":
      return {
        ...state,
        rolesAndSkills: action.payload,
      };
    case "skills":
      return {
        ...state,
        skills: action.payload,
      };
    case "locations":
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};

function ContextProvider({ children }) {
  const [globalState, dispatch] = useReducer(globalReducer, INTIAL_STATE);

  useEffect(() => {
    // getFilters(dispatch);
    // console.log("qqq calling =")
  }, []);


  
  return (
    <div>
      <MyContext.Provider
        value={{
          globalState,
          dispatch,
        }}
      >
        {children}
      </MyContext.Provider>
    </div>
  );
}

export default ContextProvider;
