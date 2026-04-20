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
    this.updatedAt = updatedAt;
  }
}
