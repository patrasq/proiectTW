import { Route } from '@angular/router';
import { HomePageComponent } from 'src/app/modules/home/components/home-page/home-page.component';

export const homeRouting: Route[] = [
	{
		path: '',
		component: HomePageComponent,
	}
]
