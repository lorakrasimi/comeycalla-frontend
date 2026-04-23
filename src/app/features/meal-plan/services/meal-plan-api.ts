import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

import {MealPlan, MealPlanDay, MealType} from '../../../core/models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanApi {
  generateMealPlan(config: { days: number; meals: string[]; excludeRepeatedRecipes: boolean }): Observable<MealPlan> {
    const recipesByType = {
      breakfast: [
        {
          id: 1,
          title: 'Tostadas con aguacate',
          img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
          category: 'breakfast'
        },
        {
          id: 2,
          title: 'Yogur con fruta',
          img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
          category: 'breakfast'
        }
      ],
      lunch: [
        {
          id: 3,
          title: 'Pasta carbonara',
          img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
          category: 'lunch'
        },
        {
          id: 4,
          title: 'Pollo al horno',
          img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80',
          category: 'lunch'
        },
        {
          id: 5,
          title: 'Salmón a la plancha',
          img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
          category: 'lunch'
        }
      ],
      dinner: [
        {
          id: 6,
          title: 'Bowl de quinoa',
          img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
          category: 'dinner'
        },
        {
          id: 7,
          title: 'Ensalada césar',
          img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
          category: 'dinner'
        },
        {
          id: 8,
          title: 'Tortilla española',
          img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
          category: 'dinner'
        }
      ]
    } as const;

    const days: MealPlanDay[] = Array.from({length: config.days}, (_, index) => {
      const slots = config.meals.map((mealType, mealIndex) => {
        const typedMeal = mealType as MealType;
        const pool = recipesByType[typedMeal] ?? [];
        const recipe = pool[(index + mealIndex) % pool.length] ?? null;

        return {
          type: typedMeal,
          recipe
        };
      });

      return {
        dayNumber: index + 1,
        slots
      };
    });

    const plan: MealPlan = {
      id: crypto.randomUUID(),
      config: {
        days: config.days,
        meals: config.meals as MealType[],
        excludeRepeatedRecipes: config.excludeRepeatedRecipes
      },
      days
    };

    return of(plan).pipe(delay(500));
  }
}
