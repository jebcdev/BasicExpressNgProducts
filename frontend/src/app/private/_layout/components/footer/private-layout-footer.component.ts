import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'private-layout-footer',
  imports: [],
  templateUrl: './private-layout-footer.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutFooterComponent {}
export default PrivateLayoutFooterComponent;
