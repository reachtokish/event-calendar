/**
******************************
* Error or success messages
******************************
*/

export const UNAUTHORIZED_MESSAGE: string = "Unauthorized: Access is denied due to invalid credentials";

export const SERVER_ERROR: string = "Internet problem. Please check your internet and try again";




/**
******************************
* service base URLs
******************************
*/

// local development environment
const API_BASE = "http://14.142.204.102:8080/rnhadmin";
 // const API_BASE = "http://192.168.2.52:8080/rnhadmin";

// for our purpose
// const API_BASE = "http://14.142.204.102:8080/rnhadmin";

// testing service url
// const API_BASE = "http://192.168.2.37:8081/rnhadmin";



/**
******************************
* file path url
******************************
*/
export const FILE_PATH_URL: string = "http://192.168.2.52:8080/rnhadmin/";
// export const FILE_PATH_URL: string = "http://14.142.204.102:8080/rnhadmin/";



/**
******************************
* Application all Web Services
******************************
*/



// Request for checking duplicate mobile no
export const CHECK_DUPLICATE_MOBILE: string = API_BASE + "/contact-api/sec/v1/checkDuplicateMobile?mobileNo=";

// Request for checking duplicate email
export const CHECK_DUPLICATE_EMAIL_ID: string = API_BASE + "/contact-api/sec/v1/checkDuplicateEmail?mailId=";

// Request for checking duplicate company name
export const CHECK_DUPLICATE_ORG: string = API_BASE + "/contact-api/sec/v1/checkDuplicateOrgName?companyName=";



/**
* Navigations Web Services
*/

// Request for creating parent navigation name
export const CREATE_NAVIGATION: string = API_BASE + "/module-api/sec/v1/createModule";

// Request for getting all the navigations
export const GET_NAVIGATIONS: string = API_BASE + "/module-api/sec/v1/getAllModules";

// Request for updating any specific navigation details
export const UPDATE_NAVIGATION: string = API_BASE + "/module-api/sec/v1/updateModule";

// Request for deleting any specific navigation detail
export const DELETE_NAVIGATION: string = API_BASE + "/module-api/sec/v1/deleteModule?moduleId=";



/**
* Roles Web Services
*/

// Request for getting user levels
export const GET_USER_LEVEL: string = API_BASE + "/sec/v1/getUserLevels";

// Request to get all roles
export const GET_ALL_ROLES: string = API_BASE + "/role-api/sec/v1/getAllRoles";

// Request for creating a role
export const CREATE_ROLE: string = API_BASE + "/role-api/sec/v1/createRole";

// Request for updating any specific role
export const UPDATE_ROLE: string = API_BASE + "/role-api/sec/v1/updateRole";

// Request for getting any specific role details
export const GET_ROLE_BY_ID: string = API_BASE + "/role-api/sec/v1/getRoleById";

// Request for deleting any specific role entry
export const DELETE_ROLE_BY_ID: string = API_BASE + "/role-api/sec/v1/deleteRole?roleId=";

// Request for getting franchise list
export const GET_FRANCHISE_BY_ROLE: string = API_BASE + "/sec/v1/getFranchiseByOrgLevel?userLevelId=";

// Request for getting reporting to
export const GET_REPORTING_TO: string = API_BASE + "/sec/v1/getReportingTo";




/**
* User Web Services
*/

// Request for checking duplicate office mail id
export const CHECK_DUPLICATE_EMAIL: string = API_BASE + "/user-profile-api/sec/v1/checkDuplicateEmail?mailId=";

// Request to create an user
export const CREATE_USER: string = API_BASE + "/user-profile-api/sec/v1/createUser";

// Request for updating any user
export const UPDATE_USER: string = API_BASE + "/user-profile-api/sec/v1/updateUser";

// Request for searching any user
export const SEARCH_USER: string = API_BASE + "/user-profile-api/sec/v1/searchUser";

// Request for getting any specific user details
export const GET_SINGLE_USER: string = API_BASE + "/user-profile-api/sec/v1/getUserById?userId=";

// Request for deleting any specific user entry
export const DELETE_USER: string = API_BASE + "/user-profile-api/sec/v1/deleteUser?userId=";

// Request for getting access role
export const GET_ACCESS_ROLE: string = API_BASE + "/sec/v1//getRolesByUserLevel";

// Request for getting access role
export const GET_ALL_USER: string = API_BASE + "/user-profile-api/sec/v1/getAllUsers";




/**
* Login Web Services
*/

// Request for login authentication
export const USER_LOGIN: string = API_BASE + "/unsec/v1/userLogin";




/**
* Contacts Web Services
*/

// Request for creating individual contact
export const CREATE_CONTACT: string = API_BASE + "/contact-api/sec/v1/createContact";

// Request for checking duplicate contact mobile
export const DUPLICATE_CONTACT_MOBILE: string = API_BASE + "/contact-api/sec/v1/checkDuplicateMobile?mobileNo=";

// Request for checking duplicate contact email
export const DUPLICATE_CONTACT_EMAIL: string = API_BASE + "/contact-api/sec/v1/checkDuplicateEmail?mailId=";

// Request for getting all contacts
export const SEARCH_CONTACT: string = API_BASE + "/contact-api/sec/v1/getAllActiveContacts";

// Request for deleting specific contact
export const DELETE_CONTACT: string = API_BASE + "/contact-api/sec/v1/deleteContact";

// Request for getting specific contact
export const GET_SINGLE_CONTACT: string = API_BASE + "/contact-api/sec/v1/getContactById";

// Request for updating specific contact
export const UPDATE_CONTACT: string = API_BASE + "/contact-api/sec/v1/updateContact";

// Request for creating organisation
export const CREATE_ORGANISATION: string = API_BASE + "/contact-api/sec/v1/createOrgContact";

// Request for updating organisation
export const UPDATE_ORGANISATION: string = API_BASE + "/contact-api/sec/v1/updateOrgContact";

// Request for updating organisation
export const SEARCH_INACTIVE_CONTACTS: string = API_BASE + "/contact-api/sec/v1/getAllInactiveContacts";

// Request for deleting inactive contacts
export const DELETE_INACTIVE_CONTACTS: string = API_BASE + "/contact-api/sec/v1/deleteInactiveContact";

// Request for save organisation contact
export const SAVE_ORG_CONTACTS: string = API_BASE + "/contact-api/sec/v1/saveOrgIndividualContact";

// Request for getting organisation contact
export const GET_ORG_CONTACTS: string = API_BASE + "/contact-api/sec/v1/getAllOrgIndividualContact";



// Request for deleting any specific role entry
export const CHECK_ROLE_EXISTS: string = API_BASE + "/role-api/sec/v1/checkDuplicateRoleOrder?roleOrder=";

// Request for getting assignedto
export const GET_ASSIGNED_TO: string = API_BASE + "/contact-api/sec/v1/getAllAssignedTo";



/**
* Franchise Web Services
*/

// Request for creating franchise
export const CREATE_FRANCHISE: string = API_BASE + "/franchise-config-api/sec/v1/createFranchise";

// Request for search franchise
export const SEARCH_FRANCHISE: string = API_BASE + "/franchise-config-api/sec/v1/searchFranchise";

// Request for getting single franchise
export const GET_SINGLE_FRANCHISE: string = API_BASE + "/franchise-config-api/sec/v1/getFranchiseById";

// Request for deleting franchise
export const DELETE_FRANCHISE: string = API_BASE + "/franchise-config-api/sec/v1/franchiseChangeStatus";

// Request for update franchise
export const UPDATE_FRANCHISE: string = API_BASE + "/franchise-config-api/sec/v1/updateFranchise";



/**
* Franchise Web Services
*/

// Request for create calendar events
export const CREATE_CALENDAR: string = API_BASE + "/calender-api/sec/v1/createCalender";

// Request for getting calendar events
export const GET_CALENDAR_EVENT: string = API_BASE + "/calender-api/sec/v1/getCalenderEvents";

// Request for deleting calendar events
export const DELETE_CALENDAR_EVENT: string = API_BASE + "/calender-api/sec/v1/deleteEvent";



/**
* Notes & Documents Web Services
*/

// 35. Request for creating notes
export const CREATE_NOTES: string = API_BASE + "/notes-api/sec/v1/createNotes";

// 36. Request for creating notes
export const UPLOAD_DOCUMENTS: string = API_BASE + "/document-api/sec/v1/createDocument";

// 37. request for delete documents
export const DELETE_DOCUMENTS: string = API_BASE + "/document-api/sec/v1/deleteDocument?documentsId=";

// 38. request for getting notes
export const GET_NOTES:string = API_BASE + "/notes-api/sec/v1/getNotes?assignedTo=";

// 38. request for getting notes
export const DELETE_NOTES:string = API_BASE + "/notes-api/deleteNotes?notesId=";

// 39. request for getting documents
export const GET_DOCUMENTS:string = API_BASE + "/document-api/sec/v1/getDocument?assignedTo=";



// 40. request for project creation
export const CREATE_PROJECT:string = API_BASE +"/project-api/sec/v1/createProject";

 //41. request for search Projects
 export const SEARCH_PROJECT:string = API_BASE +"/project-api/sec/v1/searchProjects"


/**
* Tasks & Web Services
*/

// 38. Request for creating Tasks
export const CREATE_TASKS: string = API_BASE + "/task-api/sec/v1/createTask";

//39. Request for Existing Tasks
export const CHECK_DUPLICATE_TASKS: string = API_BASE +"/task-api/sec/v1/checkTaskExist";

// 40 Request for fetching all tasks
export const GET_ALL_TASKS: string = API_BASE + "/task-api/sec/v1/getAllTasks";





/**
* Leads services
*/

// 38. Request for creating Tasks
export const CREATE_RESIDENTIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/residentials";

// 39. Request for update calendar
export const UPDATE_CALENDAR: string = API_BASE + "/calender-api/sec/v1/updateCalender";

// 39. Request for update calendar
export const CREATE_COMMERCIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/commercial";

// 39. Request for update calendar
export const CREATE_INDUSTRIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/industrial";

// 39. Request for update calendar
export const CREATE_LAND_LEAD: string = API_BASE + "/lead-api/sec/v1/lands";

// 39. Request for update calendar
export const GET_RESIDENTIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/residentials/";

// 39. Request for update calendar
export const GET_COMMERCIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/commercial/";

// 39. Request for update calendar
export const GET_LAND_LEAD: string = API_BASE + "/lead-api/sec/v1/lands/";

// 39. Request for update calendar
export const GET_INDUSTRIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/getindustrial/";

// 39. Request for search residential lead
export const SEARCH_RESIDENTIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/getAllResidentials";

// 39. Request for search residential lead
export const SEARCH_LAND_LEAD: string = API_BASE + "/lead-api/sec/v1/getAllLands";

// 39. Request for delete residential lead
export const DELETE_RESIDENTIAL_LEAD: string = API_BASE + "/lead-api/sec/v1/residentials/";

// 39. Request for getting location list
export const GET_LOCATION_LIST: string = API_BASE + "/master-config-api/sec/v1/getLocation";

// 39. Request for getting location by name
export const GET_LOCATION_BY_NAME: string = API_BASE + "/master-config-api/sec/v1/getLocationByName";

// 39. Request for delete indiidual from organisation
export const DELETE_INDIVIDUAL_ORGANISATION: string = API_BASE + "/contact-api/sec/v1/deleteContactFromOrganisation";

// 39. Request for delete indiidual from organisation
export const UPLOAD_FILE: string = API_BASE + "/sec/v1/uploadFiles";
