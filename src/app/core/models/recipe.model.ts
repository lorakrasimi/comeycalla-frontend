export type Difficulty = 'easy' | 'medium' | 'hard';

export class Recipe {
  id: number;
  title: string;
  description?: string;
  img?: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  servings: number;
  difficulty: Difficulty;
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(
    id: number,
    title: string,
    ingredients: string[],
    steps: string[],
    cookingTime: string,
    servings: number,
    difficulty: Difficulty,
    category: string,
    createdAt: Date,
    description?: string,
    img?: string,
    tags?: string[],
    updatedAt?: Date
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.steps = steps;
    this.cookingTime = cookingTime;
    this.servings = servings;
    this.difficulty = difficulty;
    this.category = category;
    this.createdAt = createdAt;
    this.description = description;
    this.img = img;
    this.tags = tags;
    this.updatedAt = updatedAt;
  }
}

export interface RecipeRequest {
  title: string;
  description: string;
  img: string | null;
  cookingTime: number | null;
  servings: number | null;
  difficulty: Difficulty;
  category: string;
  ingredients: { name: string }[] | null;
  steps: { description: string }[] | null;
  tags: string[];
}

export interface RecipeResponse {
  id: number;
  title: string;
  description: string;
  img: string | null;
  cookingTime: number;
  servings: number;
  difficulty: Difficulty;
  category: string;
  ingredients: {
    id: number;
    name: string;
    position: number;
  }[];
  steps: {
    id: number;
    stepOrder: number;
    description: string;
  }[];
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}
