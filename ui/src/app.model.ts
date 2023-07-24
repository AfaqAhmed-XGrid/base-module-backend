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

export interface GraphData {
  averageProductionBudget: number,
  moviesCount: number,
  year: number,
}

export interface FilterQueryy {
  'productionBudget[$gte]'?: number;
  'domesticGross[$gte]'?: number;
  'worldWideGross[$gte]'?: number;
  'productionBudget[$lte]'?: number;
  'domesticGross[$lte]'?: number;
  'worldWideGross[$lte]'?: number;
  [key: string]: number | undefined;
}

export interface DataTablePropType {
  movieData: MovieData;
  search: string;
  limit: number;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handlePageClick: (e: { selected: number }) => void;
  pageNo: number;
  sort: string;
  filterObj: FilterQueryy;
  setFilterObj: React.Dispatch<React.SetStateAction<FilterQueryy>>
}
