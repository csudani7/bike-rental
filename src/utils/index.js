// regex for Email Address input field
import moment from "moment";
export const regexForEmailAddress =
  // eslint-disable-next-line no-useless-escape, no-control-regex
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

// regex for Email Address input field
export const regexForMobileNumber = /^[0-9]{10}$/;

/* Regex for strong password Explanation:
^                 # start-of-string
(?=.*[0-9])       # a digit must occur at least once
(?=.*[a-z])       # a lower case letter must occur at least once
(?=.*[A-Z])       # an upper case letter must occur at least once
(?=.*[@#$%^&+=])  # a special character must occur at least once
(?=\S+$)          # no whitespace allowed in the entire string
.{8,}             # anything, at least eight places though
$                 # end-of-string */
export const regexForPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;

export const regexForName = /^[a-zA-Z ]{2,30}$/;

/* Global Errors state Utils */
export const getErrorMessage = (errors, fieldName, fieldLabel) => {
  if (errors[fieldName]) {
    const { type } = errors[fieldName];
    switch (type) {
      case "required":
        return `${fieldLabel} is required`;
      case "sameAs":
        return "Passwords does not match. Please try again.";
      case "pattern":
        return `Invalid ${fieldLabel}`;
      case "maxLength":
        return `Please Enter 10 digit ${fieldLabel}`;
      case "minLength":
        return `Please Enter At least 10 digit ${fieldLabel}`;
      default:
        return type;
    }
  } else {
    return false;
  }
};

export const userData = [
  {
    name: "Leslie Alexander_1",
    email: "test1@test.com",
    password: "test1",
    role: "user",
    id: 1,
  },
  {
    name: "Leslie Alexander_2",
    email: "test2@test.com",
    password: "test2",
    role: "user",
    id: 2,
  },
  {
    name: "Leslie Alexander_3",
    email: "test3@test.com",
    password: "test3",
    role: "user",
    id: 3,
  },
  {
    name: "Leslie Alexander_4",
    email: "test4@test.com",
    password: "test4",
    role: "user",
    id: 4,
  },
];

export const managerData = [
  {
    name: "Leslie_manager_Alexander_1",
    email: "test1@test.com",
    password: "test1",
    role: "manager",
    id: 1,
  },
  {
    name: "Leslie_manager_Alexander_2",
    email: "test2@test.com",
    password: "test2",
    role: "manager",
    id: 2,
  },
  {
    name: "Leslie_manager_Alexander_3",
    email: "test3@test.com",
    password: "test3",
    role: "manager",
    id: 3,
  },
  {
    name: "Leslie_manager_Alexander_4",
    email: "test4@test.com",
    password: "test4",
    role: "manager",
    id: 4,
  },
];

export const enumerateDaysBetweenDates = (startDate, endDate) => {
  var dates = [];

  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");
  dates.push(currDate.clone().toDate());
  while (currDate.add(1, "days").diff(lastDate) <= 0) {
    console.log(currDate.format("MM/DD/YYYY"));
    dates.push(currDate.clone().format("MM/DD/YYYY"));
  }

  return dates;
};

export const routes = [
  { path: "/home", value: "Home" },
  { path: "/my-bike", value: "My Bike" },
  { path: "/user-manage", value: "User Manage" },
  { path: "/bike-manage", value: "Bike Manage" },
];
