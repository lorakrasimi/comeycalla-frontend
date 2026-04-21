export interface RecipeFormIngredient {
  name: string;
}

export interface RecipeFormStep {
  order: number;
  description: string;
}

export interface RecipeFormValue {
  title: string;
  description: string;
  cookingTime: string | null;
  servings: number | null;
  category: string;
  tags: string[];
  imageUrl: string | null;
  ingredients: RecipeFormIngredient[];
  steps: RecipeFormStep[];
}
