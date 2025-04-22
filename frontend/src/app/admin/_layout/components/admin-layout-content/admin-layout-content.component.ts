import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-layout-content',
  imports: [RouterOutlet],
  templateUrl: './admin-layout-content.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutContentComponent {}

export default AdminLayoutContentComponent;
