import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shared-not-found-page',
  imports: [RouterLink],
  templateUrl: './shared-not-found-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedNotFoundPageComponent {}

export default SharedNotFoundPageComponent;
