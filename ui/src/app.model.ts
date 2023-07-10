export interface User {
    _id: string;
    googleId?: string;
    githubId?: string;
    displayName: string;
    email?: string;
    password?: string;
    passwordResetToken?: string;
    profilePicture?: string;
    role?: string;
  }
