export interface UserStats {
  savedRecipes: number;
  createdMenus: number;
  cookedRecipes: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  stats: UserStats;
}

export interface UserAuth {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
}

