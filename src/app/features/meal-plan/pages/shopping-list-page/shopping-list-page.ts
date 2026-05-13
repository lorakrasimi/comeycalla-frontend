import {Component, computed, OnInit, signal} from '@angular/core';
import {MealPlanStore} from '../../services/meal-plan-store';
import {ShoppingListStore} from '../../services/shopping-list-store';
import {Router} from '@angular/router';
import {UiButton} from '../../../../shared/ui/ui-button/ui-button';
import {ShoppingCategoryGroup} from '../../components/shopping-category-group/shopping-category-group';
import {UiPageHeader} from '../../../../shared/ui/ui-page-header/ui-page-header';
import {MealPlanApi} from '../../services/meal-plan-api';
import {UiLoader} from '../../../../shared/ui/ui-loader/ui-loader';

@Component({
  selector: 'app-shopping-list-page',
  imports: [
    UiButton,
    ShoppingCategoryGroup,
    UiPageHeader,
    UiLoader
  ],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.scss',
})
export class ShoppingListPage implements OnInit {
  protected readonly list = computed(() => this.shoppingListStore.shoppingList());
  protected readonly loading = signal(true);

  constructor(
    private router: Router,
    private mealPlanStore: MealPlanStore,
    protected shoppingListStore: ShoppingListStore,
    private mealPlanApi: MealPlanApi
  ) {
  }

  ngOnInit(): void {
    const currentPlan = this.mealPlanStore.currentPlan();

    if (!currentPlan?.id) {
      this.shoppingListStore.buildFromBackendResponse(null);
      return;
    }

    this.mealPlanApi.getShoppingList(currentPlan.id).subscribe({
      next: (response) => {
        this.shoppingListStore.buildFromBackendResponse(response);
        this.loading.set(false)
      },
      error: () => {
        this.shoppingListStore.buildFromBackendResponse(null);
      }
    });
  }

  protected goBackToMenu(): void {
    this.router.navigate(['/meal-plan/result']);
  }

  protected markAll(): void {
    this.shoppingListStore.markAll();
  }

  protected unmarkAll(): void {
    this.shoppingListStore.unmarkAll();
  }

  protected print(): void {
    const shoppingList = this.list();

    if (!shoppingList) {
      return;
    }

    const today = new Date().toLocaleDateString('es-ES');

    const categoriesHtml = shoppingList.categories
      .map(category => `
      <section class="shopping-category">
        <h2>${category.title}</h2>
        <ul>
          ${category.items.map(item => `<li>☐ ${item.name}</li>`).join('')}
        </ul>
      </section>
    `)
      .join('');

    const html = `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Lista de la compra</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm;
          }

          body {
            font-family: Arial, sans-serif;
            color: #000;
            font-size: 14px;
            margin: 0;
          }

          h1 {
            font-size: 20px;
            margin: 0 0 16px;
          }

          h2 {
            font-size: 15px;
            margin: 0 0 4px;
          }

          ul {
            margin: 0 0 8px;
            padding: 0;
            list-style: none;
          }

          li {
            margin: 3px 0;
          }

          .shopping-list {
            column-count: 2;
            column-gap: 32px;
          }

          .shopping-category {
            break-inside: avoid;
            margin-bottom: 12px;
          }
        </style>
      </head>

      <body>
        <h1>Mi lista de la compra del ${today}</h1>

        <main class="shopping-list">
          ${categoriesHtml}
        </main>

        <script>
          window.onload = () => {
            window.print();
            window.close();
          };
        </script>
      </body>
    </html>
  `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const popup = window.open(url, '_blank', 'width=800,height=600');

    if (!popup) {
      URL.revokeObjectURL(url);
      return;
    }

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }


  protected toggleCategory(categoryId: number): void {
    this.shoppingListStore.toggleCategory(categoryId);
  }

  protected toggleItem(itemId: number): void {
    this.shoppingListStore.toggleItem(itemId);
  }

  protected deleteItem(itemId: number): void {
    this.shoppingListStore.deleteItem(itemId);
  }

}
