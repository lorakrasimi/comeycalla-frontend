export interface RecipeFormIngredient {
  name: string;
}

export interface RecipeFormStep {
  description: string;
}

export interface RecipeFormValue {
  title: string;
  description: string | null;
  cookingTime: string | null;
  servings: number | null;
  category: string;
  tags: string[];
  ingredients: RecipeFormIngredient[];
  steps: RecipeFormStep[];
}
