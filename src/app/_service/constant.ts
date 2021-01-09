import { environment } from '../../environments/environment';

// Base url constant
export const BASEURL = environment.api_url;
export const FRONTBASEURL = environment.front_apiurl;
export const serviceimage = 'https://www.learnsetu.com/RealEstate/Backend/assets/upload/services_imgs/';
export const smallserviceimage = 'https://www.learnsetu.com/RealEstate/Backend/assets/upload/services_imgs/small/';
export const galleryimages = 'https://www.learnsetu.com/RealEstate/Backend/assets/upload/gallery_imgs/';

// Global constant file
export const CONSTANTS = Object.freeze({
    // loginapi: BASEURL + 'admin_signin', 
    // tabledataapi:BASEURL + 'user_information',
    // deleteapi:BASEURL + 'duser',
    // editapi:BASEURL + 'update_profile',
    // editemailtepmlate:BASEURL + 'email_templates',
    updateemailtemplate:BASEURL + 'update_email_template',
    // getfaqquestion:BASEURL + 'faqs',
    // updatefaq:BASEURL + 'update_faq',
    // cmsdetail:BASEURL + 'cms',
    // cmsedit:BASEURL+ 'update_cms',
    // createsubadmin:BASEURL + 'create_subadmin',
    // updateadminprofile:BASEURL + 'update_admin_profile',
    // updatebysuperadmin:BASEURL + 'update_subadmin',
    // getalladmin:BASEURL + 'admins',
    // changepassword:BASEURL+'change_password',
    
    frontloginapi: FRONTBASEURL + 'admin_signin',
    frontchangepassword:FRONTBASEURL+'change_password',
    frontupdateadminprofile:FRONTBASEURL + 'update_admin_profile', 
    frontGetService:FRONTBASEURL + 'servcies',
    frontAboutus:FRONTBASEURL + 'cms/about_us',
    fronttestimonial:FRONTBASEURL + 'testimonials',
    frontvideo:FRONTBASEURL + 'videos',
    frontfaq:FRONTBASEURL + 'faqs',
    frontnews:FRONTBASEURL + 'news',
    frontcontactform:FRONTBASEURL + 'submit_enquiry',
    frontgallery:FRONTBASEURL + 'gallery',
    // ++++ admin pannel api +++ //
    admincreatevideo:FRONTBASEURL+'create_video',
    adminupdatevideo:FRONTBASEURL+'update_video',
    admindeletevideo:FRONTBASEURL+'delete_video',
    admincreatefaq:FRONTBASEURL+'create_faq',
    adminupdatefaq:FRONTBASEURL+'update_faq',
    admindeletefaq:FRONTBASEURL+'delete_faq',
    admincreateservice:FRONTBASEURL+'create_service',
    adminupdateservice:FRONTBASEURL+'update_service',
    admindeleteservice:FRONTBASEURL+'delete_service',
    admincreatenews:FRONTBASEURL+'create_news',
    admineditnews:FRONTBASEURL+'update_news',
    admindeletenews:FRONTBASEURL+'delete_news',
    admincreatetestimon:FRONTBASEURL + 'create_testimonial',
    adminedittestimon:FRONTBASEURL + 'update_testimonial',
    admindeletetestimon:FRONTBASEURL + 'delete_testimonial',
    admineditaboutus:FRONTBASEURL + 'update_aboutus',
    adminaddgallery:FRONTBASEURL + 'create_gallery',
    admindeletegallery:FRONTBASEURL + 'delete_gallery',
    testimage:FRONTBASEURL+'create_image'
});

// loginapi: BASEURL + 'signin', 