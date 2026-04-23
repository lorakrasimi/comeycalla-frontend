import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ui-page-header',
  imports: [],
  templateUrl: './ui-page-header.html',
  styleUrl: './ui-page-header.scss',
})
export class UiPageHeader {
  @Input() title: string = '';
}
