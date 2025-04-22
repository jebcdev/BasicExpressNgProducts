import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'front-layout-content',
  imports: [RouterOutlet],
  templateUrl: './front-layout-content.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontLayoutContentComponent {}

export default FrontLayoutContentComponent;
