import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
	{
		path: '',
		children: [
			// Routes that can be accessed regardless of authentication
			{
				path: '',
				component: LayoutComponent,
				children: [
					{ path: 'home', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
				]
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
