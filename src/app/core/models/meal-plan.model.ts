export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MealPlanConfig {
  days: number;
  meals: MealType[];
  excludeRepeatedRecipes: boolean;
}

export interface MealPlanRecipe {
  id: number;
  title: string;
  img: string;
  category: MealType;
  cookingTime?: number;
  servings?: number;
}

export interface MealSlot {
  type: MealType;
  recipe: MealPlanRecipe | null;
}

export interface MealPlanDay {
  dayNumber: number;
  slots: MealSlot[];
}

export interface MealPlan {
  id: number;
  config: MealPlanConfig;
  days: MealPlanDay[];
}
