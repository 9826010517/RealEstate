import { environment } from '../../environments/environment';

// Base url constant
export const BASEURL = environment.api_url;
export const FRONTBASEURL = environment.front_apiurl;
// Global constant file
export const CONSTANTS = Object.freeze({
    loginapi: BASEURL + 'admin_signin', 
    tabledataapi:BASEURL + 'user_information',
    deleteapi:BASEURL + 'duser',
    editapi:BASEURL + 'update_profile',
    editemailtepmlate:BASEURL + 'email_templates',
    updateemailtemplate:BASEURL + 'update_email_template',
    getfaqquestion:BASEURL + 'faqs',
    updatefaq:BASEURL + 'update_faq',
    cmsdetail:BASEURL + 'cms',
    cmsedit:BASEURL+ 'update_cms',
    createsubadmin:BASEURL + 'create_subadmin',
    updateadminprofile:BASEURL + 'update_admin_profile',
    updatebysuperadmin:BASEURL + 'update_subadmin',
    getalladmin:BASEURL + 'admins',
    changepassword:BASEURL+'change_password',
    
    frontGetService:FRONTBASEURL + 'servcies',
    frontAboutus:FRONTBASEURL + 'cms/about_us',
    fronttestimonial:FRONTBASEURL + 'testimonials',
    frontvideo:FRONTBASEURL + 'videos',
    frontfaq:FRONTBASEURL + 'faqs',
    frontnews:FRONTBASEURL + 'news',
    frontcontactform:FRONTBASEURL + 'submit_enquiry',
    // ++++ admin pannel api +++ //
    admincreatevideo:FRONTBASEURL+'create_video',
    adminupdatevideo:FRONTBASEURL+'update_video',
    admindeletevideo:FRONTBASEURL+'delete_video',
    admincreatefaq:FRONTBASEURL+'create_faq',
    adminupdatefaq:FRONTBASEURL+'update_faq',
    admindeletefaq:FRONTBASEURL+'delete_faq'

});

// loginapi: BASEURL + 'signin', 