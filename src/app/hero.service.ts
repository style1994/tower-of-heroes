import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "./hero";
import { HEROES } from "./mack-heros";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
@Injectable({
	providedIn: "root",
})
export class HeroService {
	private heroesUrl = "api/heroes";
	private httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	constructor(
		private messageService: MessageService,
		private http: HttpClient
	) {}

	getHeroes(): Observable<Hero[]> {
		let errHandler = this.genErrorHandler<Hero[]>("getHeros", []);

		// tap 可以竊聽本次請求的值，使用那些值做一些事情，並且把它們傳出來
		// 這種 tap 中的回調方法不會改變這些值本身
		// catchError指定錯誤處理函數
		return this.http.get<Hero[]>(this.heroesUrl).pipe(
			tap((v) => this.log("fetched heroes")),
			catchError(errHandler)
		);
	}

	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		let errHandler = this.genErrorHandler<Hero>(`getHero id=${id}`);

		return this.http.get<Hero>(url).pipe(
			tap((_) => this.log(`fetched hero id=${id}`)),
			catchError(errHandler)
		);
	}

	/**
	 * log a HeroService message with the MessageService
	 */
	private log(message: string): void {
		this.messageService.add(`MessageService: ${message}`);
	}

	/**
	 *
	 * @param operation 操作名稱
	 * @param result 錯誤發生時要接收默認值
	 */
	genErrorHandler<T>(operation = "operation", result?: T) {
		// 產生一個錯誤處理方法
		// 錯誤處理方法會在請求失敗時會被呼叫
		return (err: any): Observable<T> => {
			//控制台打印錯誤訊息
			console.error(err);
			//頁面顯示錯誤訊息
			this.log(`${operation} failed: ${err.message}`);
			//返回默認值
			return of(result as T);
		};
	}

	public updateHero(hero: Hero): Observable<any> {
		let errorHandler = this.genErrorHandler<Hero>(
			`update hero id=${hero.id}`
		);
		let tapHandler = (_) => this.log(`update hero id=${hero.id}`);

		return this.http
			.put(this.heroesUrl, hero, this.httpOptions)
			.pipe(tap(tapHandler), catchError(errorHandler));
	}
}
