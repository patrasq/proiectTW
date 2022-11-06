import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from 'src/app/modules/home/components/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';



@NgModule({
	declarations: [
		HomePageComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(homeRouting)
	]
})
export class HomeModule { }
