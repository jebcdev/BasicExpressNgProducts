import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'front-home-page',
  imports: [RouterLink],
  templateUrl: './front-home-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontHomePageComponent {
  title=computed<string>(()=>environment.appName);
  private _authService: AuthService = inject(AuthService);
  currentYear = new Date().getFullYear();

  public authStatus = computed(() => this._authService.authStatus());
}

export default FrontHomePageComponent;
