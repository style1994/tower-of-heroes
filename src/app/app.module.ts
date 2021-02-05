import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HerosComponent } from "./heros/heros.component";
import { MessagesComponent } from "./messages/messages.component";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
@NgModule({
	declarations: [
		AppComponent,
		HerosComponent,
		HeroDetailComponent,
		MessagesComponent,
		DashboardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
			dataEncapsulation: false,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
