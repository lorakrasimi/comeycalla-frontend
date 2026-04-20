import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-avatar-cell',
  imports: [
    RouterLink
  ],
  templateUrl: './avatar-cell.html',
  styleUrl: './avatar-cell.scss',
})
export class AvatarCell {
  @Input() name: string = '';
  @Input() img: string = '';

}
