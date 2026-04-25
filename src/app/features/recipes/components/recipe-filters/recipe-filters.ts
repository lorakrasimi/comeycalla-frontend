import { Component } from '@angular/core';
import {SearchBar} from '../../../../shared/components/search-bar/search-bar';
import {SelectOption, UiSelect} from '../../../../shared/ui/ui-select/ui-select';

export const CATEGORY_OPTIONS_MOCK: SelectOption[] = [
  { label: 'Asiática', value: 'asiatica' },
  { label: 'Italiana', value: 'italiana' },
  { label: 'Saludable', value: 'saludable' },
  { label: 'Desayuno', value: 'desayuno' },
  { label: 'Americana', value: 'americana' }
];
export const TIME_OPTIONS_MOCK: SelectOption[] = [
  { label: 'Menos de 15 minutos', value: '15' },
  { label: 'Menos de 30 minutos', value: '30' },
  { label: 'Menos de una hora', value: '60' }
];

@Component({
  selector: 'app-recipe-filters',
  standalone: true,
  templateUrl: './recipe-filters.html',
  styleUrl: './recipe-filters.scss',
  imports: [
    SearchBar,
    UiSelect
  ]
})

export class RecipeFilters {
  protected readonly CATEGORY_OPTIONS_MOCK = CATEGORY_OPTIONS_MOCK;
  protected readonly TIME_OPTIONS_MOCK = TIME_OPTIONS_MOCK;
}
