import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import AdminBrandsFormComponent from '../components/form/admin-brands-form.component';

@Component({
  selector: 'app-admin-brands-create-page',
  imports: [RouterLink, AdminBrandsFormComponent],
  templateUrl: './admin-brands-create-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBrandsCreatePageComponent {}

export default AdminBrandsCreatePageComponent;
