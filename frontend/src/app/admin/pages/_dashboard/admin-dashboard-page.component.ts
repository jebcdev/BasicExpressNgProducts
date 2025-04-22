import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-dashboard-page',
  imports: [],
  templateUrl: './admin-dashboard-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardPageComponent {}

export default AdminDashboardPageComponent;
