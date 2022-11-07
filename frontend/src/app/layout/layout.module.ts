import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'home', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
        ]
      },
    ])
  ],
  exports: [
    RouterModule,
    AppRoutingModule
  ]
})
export class LayoutModule { }