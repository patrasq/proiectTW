import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Route[] = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{
		path: '',
		children: [
			// Routes that can be accessed regardless of authentication
			{
				path: '',
				component: LayoutComponent,
				children: [
					{ path: 'home', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
					{ path: 'auth', loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule) },
				]
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
