import { Difficulty } from './recipe.model';

export type RecipeImageSection =
  | 'main'
  | 'ingredients'
  | 'steps'
  | 'cover';

export interface RecipeImportImage {
  file: File;
  previewUrl: string;
  section: RecipeImageSection;
}

export interface ExtractedRecipe {
  title: string;
  description: string;
  img: string | null;
  cookingTime: number | null;
  servings: number | null;
  difficulty: Difficulty;
  category: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  rawText?: string;
}
