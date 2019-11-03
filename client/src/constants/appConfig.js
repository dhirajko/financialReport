export const API_URL = "http://localhost:5000/";
export const JWT_TOKEN = "token";
export const LOGGED_IN_USER_EMAIL = "sample-user-email";
export const USER_ID = "sample-user-id";
export const USER_IS_ADMIN = "sample-user-isadmin";
export const USER_IS_STAFF = "sample-user-isstaff";
export const USER_IS_ACTIVE = "sample-user-isactive";

let date = new Date();
let year = date.getFullYear();

const APP_CONFIG = {
  brand: "sample_project",
  year: year
};

export default APP_CONFIG;

//regex
export const alphaRegex = RegExp(/^[a-zA-Z ]*$/);
export const effectiveDateFormat = "YYYY-MM-DD";
export const momentFormat = "MMMM Do YYYY, h:mm:ss a";
