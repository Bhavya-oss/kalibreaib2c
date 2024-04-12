import { JOBS_PATH, LAKH } from "@/constants/TextConstants";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";

//make a queary of nextPath and prevPath for pages
export const formateQueary = (url) => {
  if (url) {
    const urlPath = new URL(url);
    const path = urlPath?.pathname + urlPath?.search;
    return path;
  }

  return url;
};

// getting the  diffrence  based on current date
export const getDifferenceInDate = (date) => {
  if (date) {
    const today = dayjs();
    const postedOn = dayjs(date, "YYYY-MM-DD");
    const diffInDays = today.diff(postedOn, "days");

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays === 2) {
      return "2 days ago";
    } else if (diffInDays <= 30) {
      return `${diffInDays} days ago`;
    } else if (diffInDays <= 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? "s ago" : " ago"}`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears > 1 ? "s ago" : " ago"}`;
    }
  }
};

//check array length
export const isArrayIterable = (list) => {
  if (list?.length > 0) {
    return true;
  } else {
    return false;
  }
};

//check object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

//this function take flag code and return
export const getFlagEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export let INTIAL_SELECTED_FILTERS = {};

//selected object  keys created
export const createSelectedObject = (list) => {
  let tempObj = {};

  if (list) {
    list?.forEach((data) => {
      if (data.type == "checkbox") {
        tempObj[data?.value] = [];
      } else {
        tempObj[data?.slider_data?.min_key] = data?.slider_data?.min;
        tempObj[data?.slider_data?.max_key] = data?.slider_data?.max;
      }
    });

    //  console.log("object key getting ===",tempObj)
    INTIAL_SELECTED_FILTERS = { ...tempObj };
    return tempObj;
  }
};

//creating the queary
export const createQuary = (selectedFiltersList) => {
  //setting the key of selectedFilterslist object
  const selectedKeys = Object?.keys(selectedFiltersList);

  //Initialize the url
  let url = JOBS_PATH;

  // Flag to keep track if it's the first query parameter
  let isFirstQueryParam = true;

  //looping through the selected keys
  if (Array.isArray(selectedKeys) && selectedKeys != undefined) {
    selectedKeys?.forEach((key) => {
      //get the values assosiate with the key
      const values = selectedFiltersList?.[key];

      //check if it is an array and it has values
      if (Array?.isArray(values) && values?.length > 0) {
        // If it's the first query parameter, append "/?" followed by key__in=values
        // Otherwise, append "&" followed by key__in=values
        if (isFirstQueryParam) {
          url += `/?${key}=${values.join("__")}`;
          isFirstQueryParam = false;
        } else {
          url += `&${key}=${values.join("__")}`;
        }
      }
      // Check if values is not an array and is not null or undefined
      else if (
        !Array.isArray(values) &&
        values !== null &&
        values !== undefined
      ) {
        // If it's the first query parameter, append "/?" followed by key__in=values
        // Otherwise, append "&" followed by key=values
        if (isFirstQueryParam) {
          url += `/?${key}=${values}`;
          isFirstQueryParam = false;
        } else {
          url += `&${key}=${values}`;
        }
      }
    });
  }

  // console.log("qqq quary ====",url)

  return url;
};

//this fuction will take arrayOfObject and  selected value and move to first indext of array
export const moveToFirstIndex = (array, selected) => {
  let tempArray = [...array];

  // Find the index of the object with the specified value
  let indexOfObject = array?.findIndex((obj) => obj.value === selected);

  // Check if the object exists in the array
  if (indexOfObject !== -1) {
    // Remove the object from its current position
    let removedObject = tempArray?.splice(indexOfObject, 1)[0];

    // Add the object to the first position
    tempArray?.unshift(removedObject);
  }

  // console.log("first value ===",tempArray);
  return tempArray;
};

//preparing options for autocomplete , list of rolesSkill
export const rolesSkillConvertAutoCompleteOptions = (list) => {
  const newList = list?.map((data) => {
    return {
      name: data?.role,
      value: data?.role_value,
      id: data?.id,
      skill_list: data?.skill_list,
    };
  });

  return newList;
};

//In onBoarding, we are using this, for show and hideing fields
export const isValidToShow = (display, condition, onbording) => {
  let exp = eval(condition);

  if (display || exp) {
    return true;
  } else {
    return false;
  }
};

//Manupulation for work type location
export const workTypeFormatingValues = (value) => {
  const tempData = value?.map((data) => {
    if (data.hasOwnProperty("workType")) {
      return data;
    } else {
      return {
        name: data?.name,
        value: data?.value,
        workType: ["office"],
      };
    }
  });

  return tempData;
};

//genareating the time slots
export const generateTimeOptions = () => {
  const times = [];

  // Get the current time
  const currentTime24Hr = dayjs().format("HH:mm");

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = dayjs().hour(i).minute(j);
      const value = time.format("HH:mm"); // 24-hour format
      const label = time.format("hh:mm A"); // 12-hour format with AM/PM
      times.push({ value, label });
    }
  }

  //get the current time index
  const startIndex = times.findIndex((option) => {
    let value = option.value.split(":");
    let current = currentTime24Hr.split(":");
    return value[0] === current[0];
  });

  // get current time to 0th index
  if (startIndex !== -1) {
    const part1 = times.slice(startIndex);
    const part2 = times.slice(0, startIndex);
    const circularTimes = [...part1, ...part2];

    return circularTimes;
  }

  return times;
};

// making the readable slot
export const makeReadableFormate = (data) => {
  return (
    <Stack direction="row" spacing={1}>
      <span>{dayjs(data?.dateObject).format("DD MMM")},</span>
      <span>{data?.time?.[0]} </span>
      <span>-</span>
      <span>{data?.time?.[1]} </span>
    </Stack>
  );
};

//convet validation string to function
export const makeProperValidation = (data) => {
  let copy = { ...data };

  if (copy.hasOwnProperty("validate")) {
    const validateString = copy?.validate;

    const validationFunction = eval(`(${validateString})`);
    copy.validate = validationFunction;
  }

  return copy;
};

function convert12To24(time, from12To24 = true) {
  if (from12To24) {
    return dayjs(time, "hh:mm A").format("HH:mm");
  } else {
    return dayjs(time, "HH:mm").format("hh:mm A");
  }
}

//formating the onboard field value to backend
export const formateOnboardValues = (values, edit = false) => {
  let copyValues = { ...values };

  if (edit) {
    //expected_ctc manipulation

    if (copyValues.expected_ctc != 0) {
      copyValues.expected_ctc = copyValues.expected_ctc / LAKH;
    }

    //current_ctc manipulation
    if (copyValues.current_ctc != 0) {
      copyValues.current_ctc = copyValues.current_ctc / LAKH;
    }

    //preffered location manipulation
    if (isArrayIterable(copyValues.location_work_type)) {
      copyValues.location_work_type = copyValues.location_work_type?.map(
        (data) => {
          console.log("checking data edit ====", data);

          return {
            name: data.label,
            workType: data.WorkType,
            value: data.value,
          };
        }
      );
    }

    //availability manipulation
    if (isArrayIterable(copyValues.availablity_for_interview)) {
      let tempData = copyValues.availablity_for_interview?.map((data) => {
        return {
          date: data.date,
          dateObject: data.dateObject,
          id: data.id,
          time: [
            convert12To24(data.time[0], false),
            convert12To24(data.time[1], false),
          ],
        };
      });

      copyValues.availablity_for_interview = tempData;
    }
  } else {
    //if freshere  true i am adding default value
    if (copyValues.fresher) {
      copyValues.current_role = null;
      copyValues.total_experience = 0;
      copyValues.current_ctc = 0;
    } else {
      //current role manipulation
      if (copyValues.current_role) {
        copyValues.current_role = copyValues?.current_role?.value;
      }

      //current_ctc manipulation
      if (copyValues.current_ctc != 0) {
        copyValues.current_ctc = copyValues.current_ctc * LAKH;
      }
    }

    //preferred role manipulation
    if (isArrayIterable(copyValues.preferred_roles)) {
      copyValues.preferred_roles = copyValues.preferred_roles?.map(
        (data) => data?.value
      );
    }

    //p_tech_skills manipulation
    if (isArrayIterable(copyValues.p_tech_skills)) {
      copyValues.p_tech_skills = copyValues.p_tech_skills?.map(
        (data) => data.value
      );
    }

    //current_location manipulation
    if (copyValues.current_location) {
      copyValues.current_location = copyValues?.current_location?.value;
    }

    //preffered location manipulation
    if (isArrayIterable(copyValues.location_work_type)) {
      copyValues.location_work_type = copyValues.location_work_type?.map(
        (data) => {
          console.log("checking data  ====", data);

          return {
            label: data.name,
            WorkType: data.workType,
            value: data.value,
          };
        }
      );
    }

    if (copyValues.expected_ctc_as_per_company_standards) {
      copyValues.expected_ctc = 0;
    } else {
      //expected_ctc manipulation
      if (copyValues.expected_ctc != 0) {
        copyValues.expected_ctc = copyValues.expected_ctc * LAKH;
      }
    }

    if (isArrayIterable(copyValues.availablity_for_interview)) {
      let tempData = copyValues.availablity_for_interview?.map((data) => {
        return {
          date: data.date,
          dateObject: data.dateObject,
          id: data.id,
          time: [convert12To24(data.time[0]), convert12To24(data.time[1])],
        };
      });

      copyValues.availablity_for_interview = tempData;
    }
  }

  return copyValues;
};

//get first letter of string
export const getInitialLetter = (name) => {
  const names = name?.split(" ");
  let initials = "";

  if (names?.length >= 2) {
    initials = names?.[0].charAt(0) + names?.[1].charAt(0);
  } else if (names?.length === 1) {
    initials = names[0].charAt(0);
  }
  return initials.toUpperCase();
};

//capitalize first letter
export function capitalizeFirstLetter(str) {
  // Check if the string is not empty
  if (str && typeof str === "string") {
    // Capitalize the first letter and concatenate the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    // Return an empty string or the original value if not a valid string
    return str || "";
  }
}

//show exp details
export function formateExperience(exp, role, isFresher) {
  if (isFresher) {
    return "Fresher";
  } else if (role) {
    return (
      <span>
        {exp}yrs • {role?.name}
      </span>
    );
  }
}

//for onbording  jobstatus
export function getJobStatusColor(jobStatus) {
  let style = {
    border: "2px solid",
    padding: "0.5em",
    borderRadius: "2rem",
  };

  if (jobStatus === "dormant") {
    return { backgroundColor: "#acc1ac", ...style, borderColor: "#001900" };
  } else if (jobStatus === "casual") {
    return {
      backgroundColor: "#ccdfcc",
      ...style,
      borderColor: "#006400",
    };
  } else if (jobStatus === "passive") {
    return {
      backgroundColor: "#ccf0f0",
      ...style,
      borderColor: "#00b9b9",
    };
  } else {
    return { backgroundColor: "#ccfdcc", ...style, borderColor: "#00ff00" };
  }
}

//Availability
export function formateAvailability(
  isFresher,
  isImmediateJoin,
  joiningDate,
  isResigned,
  noticePeroid
) {
  if (isFresher || isResigned) {
    if (isImmediateJoin) {
      return "Immediate";
    } else {
      return joiningDate != null
        ? dayjs(joiningDate).format("DD MMM YY")
        : null;
    }
  } else {
    return noticePeroid != null ? `${noticePeroid} Days` : "";
  }
}

export const manipulateOnboardValidation = (data, validation) => {
  // console.log("valid data ===", data);
  // console.log("valid validation ===", validation);

  //we doing for this  afte data also  form hook is validating
  //so if data is there we removing validtion
  if (data != null && data?.length != 0) {
    if (validation.hasOwnProperty("validate")) {
      return {
        validate: validation.validate,
      };
    } else {
      return null;
    }
  } else {
    return validation;
  }
};

//margin two array of objects
export const margeTwoArrayOfObject = (array1, array2) => {

  // console.log("created array 1 =",array1)
  // console.log("created array 2 =",array2)

  const data =  array1.map((item, index) => {
    // Merge item from array1 with item from array2 at the same index
    return { ...item, style: array2[index] };
  });

  // console.log("created function result =",data)

  return data
};




//checking which filter is applied
export const isFilterApplied = (globalState,value) => {

 const result = isArrayIterable(globalState.selectedFilters[value])

 return result

}

//checking how many type of filters are applied
export const countNonEmptyArray = (objOfArray) => {

  let count = 0;

  for (const key in objOfArray) {
    if (Array.isArray(objOfArray[key]) && objOfArray[key].length > 0) {
      count++;
    }
  }

  return count;

}