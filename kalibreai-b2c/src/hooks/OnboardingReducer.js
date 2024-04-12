import { LOADING_INIT } from "@/constants/TextConstants";

export const intialData = {
  loading: LOADING_INIT,
  pageNum: 0,
  fields: {},
};

export const onboardingReducer = (state, action) => {
  switch (action.type) {
    case "pageNum":
      return {
        ...state,
        pageNum: action.payload,
      };
    case "pageNumAndLoading":
      return {
        ...state,
        pageNum: action.payload.pageNumb,
        loading: action.payload.loading,
      };
      
    case "fullData":
      return {
        ...state,
        pageNum: action.payload.pageNum,
        fields: action.payload.fields,
        loading:action.payload.loading,
      };
    case "name":
      return {
        ...state,
        fields: {
          ...state.fields,
          name: action.payload,
        },
      };
    case "photo":
      return {
        ...state,
        fields: {
          ...state.fields,
          photo: action.payload,
        },
      };
    case "job_seakers_status":
      return {
        ...state,
        fields: {
          ...state.fields,
          job_seakers_status: action.payload,
        },
      };
    case "preferred_roles":
      return {
        ...state,
        fields: {
          ...state.fields,
          preferred_roles: action.payload,
        },
      };
    case "fresher":
      return {
        ...state,
        fields: {
          ...state.fields,
          fresher: action.payload,
        },
      };
    case "total_experience":
      return {
        ...state,
        fields: {
          ...state.fields,
          total_experience: action.payload,
        },
      };

    case "current_role":
      return {
        ...state,
        fields: {
          ...state.fields,
          current_role: action.payload,
        },
      };
    case "p_tech_skills":
      return {
        ...state,
        fields: {
          ...state.fields,
          p_tech_skills: action.payload,
        },
      };
    case "location_work_type":
      return {
        ...state,
        fields: {
          ...state.fields,
          location_work_type: action.payload,
        },
      };
    case "any_location":
      return {
        ...state,
        fields: {
          ...state.fields,
          any_location: action.payload,
        },
      };
    case "current_location":
      return {
        ...state,
        fields: {
          ...state.fields,
          current_location: action.payload,
        },
      };
    case "relocation":
      return {
        ...state,
        fields: {
          ...state.fields,
          relocation: action.payload,
        },
      };
    case "expected_ctc":
      return {
        ...state,
        fields: {
          ...state.fields,
          expected_ctc: action.payload,
        },
      };
    case "current_ctc":
      return {
        ...state,
        fields: {
          ...state.fields,
          current_ctc: action.payload,
        },
      };
    case "expected_ctc_as_per_company_standards":
      return {
        ...state,
        fields: {
          ...state.fields,
          expected_ctc_as_per_company_standards: action.payload,
        },
      };
    case "resigned":
      return {
        ...state,
        fields: {
          ...state.fields,
          resigned: action.payload,
        },
      };
    case "date_of_joining":
      return {
        ...state,
        fields: {
          ...state.fields,
          date_of_joining: action.payload,
        },
      };
    case "is_immediate_joiny":
      return {
        ...state,
        fields: {
          ...state.fields,
          is_immediate_joiny: action.payload,
        },
      };
    case "notice_period":
      return {
        ...state,
        fields: {
          ...state.fields,
          notice_period: action.payload,
        },
      };
    case "notice_period_negotiable":
      return {
        ...state,
        fields: {
          ...state.fields,
          notice_period_negotiable: action.payload,
        },
      };
    case "buy_out":
      return {
        ...state,
        fields: {
          ...state.fields,
          buy_out: action.payload,
        },
      };
    case "product_or_service":
      return {
        ...state,
        fields: {
          ...state.fields,
          product_or_service: action.payload,
        },
      };
    case "mnc_or_startup":
      return {
        ...state,
        fields: {
          ...state.fields,
          mnc_or_startup: action.payload,
        },
      };
    case "bootstrapped_or_funded":
      return {
        ...state,
        fields: {
          ...state.fields,
          bootstrapped_or_funded: action.payload,
        },
      };
    case "availablity_for_interview":
      return {
        ...state,
        fields: {
          ...state.fields,
          availablity_for_interview: action.payload,
        },
      };
    case "resume":
      return {
        ...state,
        fields: {
          ...state.fields,
          resume: action.payload,
        },
      };
    case "resumedata":
      return {
        ...state,
        fields: {
          ...state.fields,
          resumedata: action.payload,
        },
      };
    default:
      return state;
  }
};
