import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-auth-form',
  imports: [],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() showLogo: boolean = true;
}
