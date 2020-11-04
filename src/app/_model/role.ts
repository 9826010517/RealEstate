export const Role = {
  authRoles:{
    User : ['Admin','Super_admin','User'], // only Superadmin and admin and user has access
    Admin : ['Admin','Super_admin'], // only Superadmin and admin has access
    Superadmin : ['Super_admin'],// only superadmin has access
  }
  }