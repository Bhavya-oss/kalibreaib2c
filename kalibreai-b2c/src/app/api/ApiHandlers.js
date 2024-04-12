import {
  CAND_COUNT_PER_SKILL,
  CONTACT_US_API,
  EARLY_ACCESS_CLIENT_POST,
  EMAIL_DOMAIN_CHECK,
  FILTERS_PATH,
  LOADING_PENDING,
  LOADING_SUCCESS,
  ONBOARDING_QUETIONS,
  ROLES_SKILL_MAP,
  UPDATE_ONBOARDING,
} from "@/constants/TextConstants";
import {
  createSelectedObject,
  formateQueary,
  rolesSkillConvertAutoCompleteOptions,
} from "@/utils/CustomFunctions";
import {
  createCode,
  consumeCode,
  resendCode,
} from "supertokens-web-js/recipe/passwordless";
import Session from "supertokens-web-js/recipe/session";

import api from "@/utils/HttpCommons";

//get all jobs
export const getJobs = async (url, dispatch) => {
  try {
    let inti = {
      list: [],
      nextPath: null,
      prevPath: null,
      loading: LOADING_PENDING,
    };

    dispatch({ type: "jobs", payload: inti });

    const response = await api.get(url);
    // console.log("asd respose ====", response.data);

    const data = {
      list: response?.data?.results,
      nextPath: formateQueary(response?.data?.next),
      prevPath: formateQueary(response?.data?.previous),
      loading: LOADING_SUCCESS,
    };

    dispatch({ type: "jobs", payload: data });

    return response.data;
  } catch (error) {
    console.log("Error from getJobs : ", error);
  }
};

//get all Filters
export const getFilters = async (dispatch) => {
  try {
    let inti = {
      list: [],
      loading: LOADING_PENDING,
    };

    dispatch({ type: "filters", payload: inti });

    const response = await api.get(FILTERS_PATH);
    // console.log("asd respose ====", response.data);

    const data = {
      list: response?.data,
      loading: LOADING_SUCCESS,
    };

    let selectedFilterList = createSelectedObject(response?.data);

    dispatch({ type: "filters", payload: data });
    dispatch({ type: "selected_filter", payload: selectedFilterList });

    return response.data;
  } catch (error) {
    console.log("Error from getJobs : ", error);
  }
};

//send phone number to backend
export const sendPhoneNumber = async (postData) => {
  try {
    const response = await createCode(postData);
    const result = await response.data;
    return result;
  } catch (error) {
    console.log("Error from sendPhoneNumber :", error);
  }
};

//resend the phonenumber to backend
export const resendPhoneNumber = async () => {
  try {
    const response = await resendCode();
    return response;
  } catch (error) {
    console.log("Error from resendPhoneNumber :", error);
  }
};

//send otp to backend
export const sendOtp = async (postData, dispatch) => {
  try {
    const response = await consumeCode(postData);

    if (response?.status == "OK") {
      const userInfo = {
        phone_number: response?.phone_number,
        user_id: response?.user_id,
      };

      localStorage.setItem("info", JSON.stringify(userInfo));

      dispatch({ type: "auth", payload: true });

      return true;
    } else {
      if (response?.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        let tempData = {
          type: "otpErrorStatus",
          payload:
            "Wrong OTP! Please try again,Number of attempts left :" +
            (response?.maximumCodeInputAttempts -
              response?.failedCodeInputAttemptCount),
        };

        dispatch(tempData);
      } else if (response?.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        let tempData = {
          type: "otpErrorStatus",
          payload: "Invalid OTP. Generate a new one and retry",
        };

        dispatch(tempData);
      } else {
        let tempData = {
          type: "otpErrorStatus",
          payload: "Login failed. Please try again",
        };

        dispatch(tempData);
      }

      return false;
    }
  } catch (error) {
    console.log("Error from sendOtp :", error);
  }
};

//logout the session
export const signOut = async () => {
  try {
    await Session.signOut();
    localStorage.removeItem("info");
  } catch (error) {
    console.log("Error from signOut :", error);
  }
};

// onbord data
export const intilData = {
  onboardingpages: [
    {
      heading: "Welcome onboard!",
      paragraph:
        "Welcome aboard! We're thrilled to have you join us on Kalibre! Whether you're a seasoned expert or just beginning your tech journey, we have something tailored just for you. Beyond just job listings, it's your exclusive hub for tech buzz, trends, and insider company insights. Are you excited to dive in and start exploring?",
      fields: [
        {
          label: "Add your name",
          name: "name",
          type: "input",
          required: true,
          validation: { required: "Name is required!" },
          placeholder: "Enter your name",
        },
        {
          label: "Upload Your photo",
          name: "photo",
          type: "photo_uploader",
          display: true,
          required: false,
        },
      ],
    },
    {
      heading: "Now, let's craft your professional narrative!",
      fields: [
        {
          label: "What's Your Job Search Mode?",
          name: "job_seakers_status",
          type: "radio_button",
          required: true,
          options: [
            {
              label: "Actively looking 😊",
              value: "active",
            },
            {
              label: "Occasionally browsing 😌",
              value: "casual",
            },
            {
              label: "Not active, but open for good ones 🤔",
              value: "passive",
            },
            {
              label: "Not looking out 😴",
              value: "dormant",
            },
          ],
          validation: { required: "Required field!" },
          display: true,
        },
      ],
    },
    {
      heading: "Whats your craft?",
      fields: [
        {
          label: "What role are you looking for?",
          name: "preferred_roles",
          type: "auto_complete",
          validation: {
            required: "Role is required!",
            validate: '(value) => value.length <= 2 || "Max 2 options allowed"',
          },
          multiple: true,
          isElasticSearch: false,
          listType: "rolesAndSkills",
          display: true,
        },
        {
          name: "fresher",
          type: "switch",
          label: "Fresher",
          style: { margin: "0px 0px -38px  0px" },
          display: true,
        },
        {
          label: "What is your Experience?",
          name: "total_experience",
          type: "slider",
          min: 1,
          max: 30,
          step: 0.5,
          display: false,
          condition: "!onbording?.fresher",
          marks: [
            {
              value: 1,
              label: "1yrs",
            },
            {
              value: 15,
              label: "15yrs",
            },
            {
              value: 30,
              label: "30yrs",
            },
          ],
          validation: {
            validate:
              '(value) => (value >= 1 && value <= 30) || "Invalid total exp!"',
          },
          display: false,
          condition: "!onbording?.fresher",
        },
        {
          label: "What is you latest role",
          name: "current_role",
          type: "auto_complete",
          listType: "rolesAndSkills",
          multiple: false,
          isElasticSearch: false,
          validation: {
            required: "Current role is required!",
          },
          display: false,
          condition: "!onbording?.fresher",
        },
        {
          label: "Pick your Top Tech Skills",
          name: "p_tech_skills",
          type: "auto_complete",
          listType: "skills",
          multiple: true,
          isElasticSearch: true,
          validation: {
            required: "Primary skills is required!",
            validate: '(value) => value.length <= 6 || "Max 6 options allowed"',
          },
          api_path: "/search/skill/?skill_type=t",
          display: true,
        },
      ],
    },
    {
      heading: "Lets explore your work preferences",
      fields: [
        {
          label: "What is your work type preference and preferred locations?",
          name: "location_work_type",
          type: "auto_complete",
          api_path: "search/location/?preferred=true",
          listType: "locations",
          multiple: true,
          display: true,
          isElasticSearch: true,
          validation: {
            required: "Preferred locations is required!",
          },
          switchName: "any_location",
          switchLabel: "Any Location",
        },
        {
          label: "Your current location?",
          name: "current_location",
          type: "auto_complete",
          api_path: "search/location/?preferred=true",
          listType: "locations",
          multiple: false,
          display: true,
          isElasticSearch: true,
          validation: {
            required: "Current locations is required!",
          },
        },

        {
          name: "relocation",
          type: "switch",
          label: "I’m willing to relocate",
          style: { margin: null },
          display: true,
        },
      ],
    },
    {
      heading: "Money matters!",
      fields: [
        {
          label: "What are your expectations?",
          name: "expected_ctc",
          type: "slider",
          min: 0,
          max: 100,
          step: 0.5,
          display: true,
          marks: [
            {
              value: 0,
              label: "0 Lpa",
            },
            {
              value: 30,
              label: "30Lpa",
            },
            {
              value: 80,
              label: "80Lpa",
            },
            {
              value: 100,
              label: "100Lpa",
            },
          ],
          validation: {
            validate:
              '(value) => (value >= 1 && value <= 100) || "Invalid Expected Ctc!"',
          },
          switchLabel: "I am flexible",
          switchName: "expected_ctc_as_per_company_standards",
        },
        {
          label: "What is your current Pay?",
          name: "current_ctc",
          type: "slider",
          min: 0,
          max: 100,
          step: 0.5,
          display: false,
          condition: "!onbording?.fresher",
          marks: [
            {
              value: 0,
              label: "0 Lpa",
            },
            {
              value: 30,
              label: "30Lpa",
            },
            {
              value: 80,
              label: "80Lpa",
            },
            {
              value: 100,
              label: "100Lpa",
            },
          ],
          validation: {
            validate:
              '(value) => (value >= 1 && value <= 100) || "Invalid Current Ctc!"',
          },
        },
      ],
    },
    {
      heading: "Let's Plan Your Next Move!",
      fields: [
        {
          label: "Have you resigned?",
          name: "resigned",
          type: "radio_button",
          options: [
            {
              label: "Yes",
              value: true,
            },
            {
              label: "No",
              value: false,
            },
          ],
          isRowDirection: true,
          display: false,
          condition: "!onbording?.fresher",
        },
        {
          name: "date_of_joining",
          type: "date",
          label: "When are you available to join?",
          validation: {
            required: "This field is required!",
          },
          display: false,
          condition: "onbording?.resigned != false || onbording?.fresher",
          switchLabel: "Immediate joining",
          switchName: "is_immediate_joiny",
        },
        {
          name: "notice_period",
          type: "group_buttons",
          label: "What is your notice period?",
          condition: "!onbording?.fresher && onbording?.resigned != true",
          validation: {
            required: "Notice period is required!",
          },
          options: [
            {
              name: "07 Days",
              value: 7,
            },
            {
              name: "15 Days",
              value: 15,
            },
            {
              name: "30 Days",
              value: 30,
            },
            {
              name: "45 Days",
              value: 45,
            },
            {
              name: "60 Days",
              value: 60,
            },
            {
              name: "90 Days",
              value: 90,
            },
          ],
          display: false,
        },
        {
          label: "Negotiable Days",
          name: "notice_period_negotiable",
          type: "select",
          display: false,
          condition:
            "!onbording?.fresher && onbording?.resigned != true && onbording?.notice_period >= 30",
          options: [
            {
              name: "Non-negotiable",
              value: "Non-negotiable",
            },
            {
              name: "07 Days",
              value: 7,
            },
            {
              name: "15 Days",
              value: 15,
            },
            {
              name: "30 Days",
              value: 30,
            },
            {
              name: "45 Days",
              value: 45,
            },
            {
              name: "60 Days",
              value: 60,
            },
            {
              name: "90 Days",
              value: 90,
            },
          ],
        },
        {
          name: "buy_out",
          type: "switch",
          label: "Buyout",
          display: false,
          condition:
            "!onbording?.fresher && onbording?.resigned != true && onbording?.notice_period >= 30 && onbording?.notice_period_negotiable != 'Non-negotiable'",
        },
      ],
    },
    {
      heading: "Let's Plan Your Next Move!",
      fields: [
        {
          label: "Product or Service",
          name: "product_or_service",
          type: "checkBox_button",
          dependent: "total_experience",
          options: [
            {
              label: "Product-based",
              value: "Product-based",
            },
            {
              label: "Service-based",
              value: "Service-based",
            },
          ],
          direction: "horizontal",
          display: true,
          validation: { required: "This field is required!" },
        },
        {
          label: "MNC or Startup",
          name: "mnc_or_startup",
          type: "checkBox_button",
          options: [
            {
              label: "MNC",
              value: "MNC",
            },
            {
              label: "Startup",
              value: "Startup",
            },
          ],
          direction: "horizontal",
          display: true,
          validation: { required: "This field is required!" },
        },
        {
          label: "Bootstrapped or Funded",
          name: "bootstrapped_or_funded",
          type: "checkBox_button",
          options: [
            {
              label: "Bootstrapped",
              value: "Bootstrapped",
            },
            {
              label: "Funded",
              value: "Funded",
            },
          ],
          direction: "horizontal",
          display: true,
          validation: { required: "This field is required!" },
        },
      ],
    },
    {
      heading: "Let's Plan Your Next Move!",
      fields: [
        {
          fullData: "resumedata",
          label: "Upload your resume",
          name: "resume",
          type: "file_uploader",
          validation: { required: "Resume is required!" },
        },
        {
          label: "When are you available",
          max_available_slot: 3,
          name: "availablity_for_interview",
          type: "availability",
          validation: { required: "Available slots is required!" },
        },
      ],
    },
  ],
  redirect_onboard_page: 1,
  fields: {
    name: "",
    photo: null,
    job_seakers_status: null,
    preferred_roles: [],
    fresher: false,
    total_experience: 1,
    current_role: null,
    p_tech_skills: [],
    location_work_type: [],
    any_location: false,
    current_location: null,
    relocation: true,
    expected_ctc: 0,
    current_ctc: 0,
    expected_ctc_as_per_company_standards: false,
    resigned: true,
    date_of_joining: null,
    is_immediate_joiny: false,
    notice_period: null,
    notice_period_negotiable: "Non-negotiable",
    buy_out: false,
    product_or_service: [],
    mnc_or_startup: [],
    bootstrapped_or_funded: [],
    availablity_for_interview: [],
    resume: null,
    resumedata: {
      name: null,
      uploadStatus: true,
      progress: 0,
    },
  },
};

//getOnboarding data
export const getOnboardingPages = async (data, dispatch) => {
  try {
    let inti = {
      list: [],
      loading: LOADING_PENDING,
    };
    dispatch({ type: "onbordingQuestions", payload: inti });

    // const response = await api.put(ONBOARDING_QUETIONS, data);

    // console.log("ccc server response ===", response.data);
    // console.log("ccc client response ===", intilData);

    // let onBoardQuestions = {
    //   list: response?.data?.onboardingpages,
    //   loading: LOADING_SUCCESS,
    // };

    // frontend data
    let onBoardQuestions = {
      list: intilData.onboardingpages,
      loading: LOADING_SUCCESS,
    };

    dispatch({ type: "onbordingQuestions", payload: onBoardQuestions });

    // return intilData

    return response.data;
  } catch (error) {
    console.log("Error from getOnboardingPages :", error);
  }
};

export const updateOnboarding = async (data, dispatch, setValue) => {
  try {
    const response = await api.put(UPDATE_ONBOARDING, data);

    return response.data;
  } catch (error) {
    console.log("Error from getOnboardingPages :", error);
  }
};

//get Roles skill mapping
export const getRolesSkills = async (dispatch) => {
  try {
    const response = await api.get(ROLES_SKILL_MAP);

    const roleSkillList = rolesSkillConvertAutoCompleteOptions(response.data);

    dispatch({
      type: "rolesAndSkills",
      payload: {
        list: roleSkillList,
      },
    });

    return;
  } catch (error) {
    console.log("Error from getRolesSkills :", error);
  }
};

//get Roles skill mapping
export const getSkills = async (url) => {
  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.log("Error from getRolesSkills :", error);
  }
};

//get locations
export const getLocations = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log("Error from getLocations :", error);
  }
};

//contact info  submition
export const submitContactUs = async (data) => {
  try {
    const response = await api.post(CONTACT_US_API, data);
    const result = response.data;
    return result;
  } catch (erorr) {
    console.log("Error from submitContactUs :-", erorr);
  }
};

//get candidate count per skills
export const getCandCountPerSkill = async () => {
  try {
    const response = await api.get(CAND_COUNT_PER_SKILL);
    return response.data;
  } catch (error) {
    console.log("Error from getLocations :", error);
  }
};

//checking email is valid or not
export const isPublicDomaiEmail = async (data) => {
  try {
    const response = await api.get(`${EMAIL_DOMAIN_CHECK}${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//earlyacces client detail post
export async function postClientData(data) {
  try {
    const response = await api.post(EARLY_ACCESS_CLIENT_POST, data);
    const result = response.data;
    return result;
  } catch (erorr) {
    console.log(erorr);
  }
}