import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipesApi } from '../../services/recipes-api';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { SelectOption, UiSelect } from '../../../../shared/ui/ui-select/ui-select';

export interface RecipeFiltersValue {
  search: string;
  category: string;
  maxTime: string;
}

export const TIME_OPTIONS: SelectOption[] = [
  { label: 'Menos de 15 minutos', value: '15' },
  { label: 'Menos de 30 minutos', value: '30' },
  { label: 'Menos de una hora', value: '60' }
];

@Component({
  selector: 'app-recipe-filters',
  standalone: true,
  templateUrl: './recipe-filters.html',
  styleUrl: './recipe-filters.scss',
  imports: [SearchBar, UiSelect]
})
export class RecipeFilters implements OnInit {
  @Output() filtersChange = new EventEmitter<RecipeFiltersValue>();

  categoryOptions: SelectOption[] = [];
  readonly timeOptions = TIME_OPTIONS;

  search = '';
  category = '';
  maxTime = '';

  constructor(private recipesApi: RecipesApi) {}

  ngOnInit(): void {
    this.recipesApi.getCategories().subscribe((categories) => {
      this.categoryOptions = categories.map((category) => ({
        label: category,
        value: category,
      }));
    });
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.emitFilters();
  }

  onCategoryChange(value: string): void {
    this.category = value;
    this.emitFilters();
  }

  onMaxTimeChange(value: string): void {
    this.maxTime = value;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChange.emit({
      search: this.search,
      category: this.category,
      maxTime: this.maxTime,
    });
  }
}
