import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AdminLayoutSideBarComponent,
  AdminLayoutContentComponent,
} from '@admin/_layout/components';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-layout',
  imports: [AdminLayoutSideBarComponent, AdminLayoutContentComponent],
  templateUrl: './admin-layout.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {}

export default AdminLayoutComponent;
