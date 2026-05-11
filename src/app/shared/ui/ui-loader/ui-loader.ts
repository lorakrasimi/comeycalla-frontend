import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loader',
  standalone: true,
  imports: [],
  templateUrl: './ui-loader.html',
  styleUrl: './ui-loader.scss',
})
export class UiLoader {
  @Input() label: string = 'Cargando...';
  @Input() fullPage: boolean = false;
}
