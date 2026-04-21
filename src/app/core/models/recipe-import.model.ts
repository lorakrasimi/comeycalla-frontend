export interface ExtractedRecipe {
  title: string;
  description: string;
  cookingTime: string | null;
  servings: number | null;
  category: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

