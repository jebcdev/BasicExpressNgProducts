import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AuthLayoutHeaderComponent,
  AuthLayoutContentComponent,
  AuthLayoutFooterComponent,
} from '@auth/_layout/components';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'auth-layout',
  imports: [
    AuthLayoutHeaderComponent,
    AuthLayoutContentComponent,
    AuthLayoutFooterComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}

export default AuthLayoutComponent;
