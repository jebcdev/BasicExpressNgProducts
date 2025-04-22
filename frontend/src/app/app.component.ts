import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [expand]="true"
      position="top-right"
      richColors
      closeButton
    />

    <router-outlet />
  `,
})
export class AppComponent {}
