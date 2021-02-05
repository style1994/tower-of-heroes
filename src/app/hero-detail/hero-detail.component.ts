import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "../hero.service";
import { of } from "rxjs";

@Component({
	selector: "app-hero-detail",
	templateUrl: "./hero-detail.component.html",
	styleUrls: ["./hero-detail.component.css"],
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero();
	}

	private getHero() {
		const id = +this.route.snapshot.paramMap.get("id");
		this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
	}

	public goBack(): void {
		this.location.back();
	}

	public goSave(): void {
		this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
		// 觀察者模式，並需要有subscribe才會真正運行。
		this.heroService.updateHero(this.hero).subscribe();
	}
}
