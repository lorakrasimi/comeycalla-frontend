export interface RecipeDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  img: string | null;
  cookingTime: string | null;
  servings: number | null;
  difficulty?: string | null;
  ingredients: string[];
  steps: string[];
}
