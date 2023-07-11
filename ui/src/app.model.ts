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

export interface Movie {
    releaseDate?: Date;
    title?: string;
    productionBudget?: number;
    domesticGross?: number;
    worldWideGross?: number;
}

export interface MovieData {
  movies: Movie[];
  movieCount: number;
}
