import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'front-home-page',
  imports: [RouterLink],
  templateUrl: './front-home-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontHomePageComponent {
  private _authService: AuthService = inject(AuthService);
  currentYear = new Date().getFullYear();

  public authStatus = computed(() => this._authService.authStatus());
}

export default FrontHomePageComponent;
