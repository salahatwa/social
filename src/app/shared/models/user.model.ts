export interface User {
  accessToken?: string;
    bio?: string;
    email?: string;
    id?: string;
    image?: string;
    profile?: UserPrincipal;
    username?: string;
}

export interface UserPrincipal {
  authorities?: Array<GrantedAuthority>;
  deptCode?: string;
  id?: string;
  lang?: string;
  numOfFailedLogins?: string;
  username?: string;
}

export interface GrantedAuthority { 
  authority?: string;
}

