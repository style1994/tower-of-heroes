import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "./hero";

@Injectable({
	providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
	constructor() {}
	createDb() {
		const heroes = [
			{ id: 11, name: "Dr Nice" },
			{ id: 12, name: "Narco" },
			{ id: 13, name: "Bombasto" },
			{ id: 14, name: "Celeritas" },
			{ id: 15, name: "Magneta" },
			{ id: 16, name: "RubberMan" },
			{ id: 17, name: "Dynama" },
			{ id: 18, name: "Dr IQ" },
			{ id: 19, name: "Magma" },
			{ id: 20, name: "Tornado" },
		];
		return { heroes };
	}

	/**
	 * 產生英雄ID
	 * 如果當前沒有英雄，ID從11開始
	 * 如果已存在英雄，ID取英雄ID最大值+1
	 * @param heroes 目前所有英雄
	 */
	genId(heroes: Hero[]): number {
		return heroes.length > 0
			? Math.max(...heroes.map((hero) => hero.id)) + 1
			: 11;
	}
}
