import {
  SENSIBLE_IMAGE,
  SIMPLE_IMAGE,
  SMART_IMAGE,
  SPEEDY_IMAGE,
} from "./MediaConstants";

//api paths
export const JOBS_PATH = "search/b2cjobs";
export const FILTERS_PATH = "b2c/filters";
export const ONBOARDING_QUETIONS = "candidates/getcandonboard";
export const UPDATE_ONBOARDING = "onboarding/updateuserdetail/candidateonboard";
export const ROLES_SKILL_MAP = "commons/roleskillsmapping";
export const SKILL_API = "/search/skill/?skill_type=t";
export const PRESIGNED_URL = "candidates/presignedurl";
export const CONTACT_US_API = "b2c/contactus";
export const CAND_COUNT_PER_SKILL = "search/jobsforskills/";
export const EMAIL_DOMAIN_CHECK = "b2c/is_public_domain/";
export const EARLY_ACCESS_CLIENT_POST = "client/earlyaccessprogram"


//api status
export const LOADING_INIT = "init";
export const LOADING_PENDING = "pending";
export const LOADING_SUCCESS = "success";

//pdf configs
export const S3_BUCKET_NAME = "brain-merit-storage";
export const S3_PERMISION_METHOD = "put_object";
export const S3_FOLDER_NAME = "dev/";

export const CLEAR_BUTTON_STRING = "Clear";
export const RESET_BUTTON_STRING = "Reset";
export const APPLY_BUTTON_STRING = "Apply";
export const CANCEL_BUTTON_STRING = "Cancel";
export const SHOW_MORE_BUTTON_STRING = "Show more";
export const SHOW_LESS_BUTTON_STRING = "Show less";

export const CONTINUE_BUTTON_STRING = "Continue";
export const BACK_BUTTON_STRING = "Back";
export const EXPLORE_JOBS_STRING = "Explore jobs";
export const SUBSCRIBE_BUTTON_STRING = "SUBSCRIBE";
export const START_HIRING_BUTTON_STRING = "Start Hiring"
export const LAKH = 100000;

//client page tabs data
export const TABS_DATA = [
  {
    bgImage: SPEEDY_IMAGE,
    list: [
      "Expert interviewer network",
      "Interview templates",
      "Smart interview scheduler",
      "Pre vetted candidates",
      "Hyper Sync tables",
      "Automated resume parsing",
      "Automated screening bot",
    ],
  },
  {
    bgImage: SMART_IMAGE,
    list: [
      "Ai based auto matching",
      "Interview templates",
      "Smart interview scheduler",
      "Virtual tables",
      "Candidate pipelines",
      "Interview platform",
      "Expert interviewer network",
    ],
  },
  {
    bgImage: SIMPLE_IMAGE,
    list: [
      "One click hire",
      "Pre vetted Candidates",
      "Ai based auto matching",
      "Multi job board posting",
      "Interview platform",
    ],
  },
  {
    bgImage: SENSIBLE_IMAGE,
    list: ["Freemium", "Pay as you grow", "Customized"],
  },
];
