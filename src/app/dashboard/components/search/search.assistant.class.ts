import { EventEmitter } from "@angular/core";
import { EMPTY, Observable, of, Subscription } from "rxjs";
import { catchError, debounceTime, filter, map, switchMap, tap } from "rxjs/operators";
import { Constants } from "../../models/constants.interface";
import { GiphyMetaType } from "../../models/meta-type";
import { GiphyPaginationType } from "../../models/pagination.type";
import { GiphySearchType } from "../../models/search.type";
import { GiphyService } from "../../services/giphyservices.service";

export abstract class SearchAssistant {
    protected subs: Subscription[] = [];
    searchTypeHead$: EventEmitter<string> = new EventEmitter<string>();
    response$: Observable<Constants<number, string>[]> = of([]);
    searchResult: GiphySearchType = {
        data: [],
        meta: {} as GiphyMetaType,
        pagination: {} as GiphyPaginationType,
    };
    ngslectSpinner = false;
    loading = false;
    error = false;
    offset = 0;
    queryBackup = '';
    constructor(
        private giphyService: GiphyService,
    ) { }

    /**
     * @description used for auto compelete
     */
    protected autoComplete(): void {
        this.response$ = this.searchTypeHead$.pipe(
            filter(query => query !== null && query?.length > 0),
            debounceTime(1000),
            tap(_ => this.ngslectSpinner = true),
            switchMap(query => this.giphyService.autoComplete(query).pipe(
                catchError(error => of(error).pipe(
                    tap(_ => this.error = true),
                    switchMap(_ => EMPTY)
                ))
            )),
            map(response => response.data.map(item => item.name).map((data, id) => ({ id, data }))),
            tap(_ => this.ngslectSpinner = false),
            // tap(r => console.log(r))
        );
    }

    /**
     * @description searchs for gifs based on request citeria
     * @param query query to search 
     * @param offset 
     * @param concat should be concated with previously retived datas?
     */
    protected fetchResults(query: string, offset = 0, concat = false): void {
        this.loading = true;
        this.error = false;
        this.giphyService.search(query, offset).subscribe(
            next => {
                concat === true ?
                    this.searchResult.data = this.searchResult.data.concat(next.data) :
                    this.searchResult = next;
                const toSet = next.pagination.offset + next.pagination.count;
                toSet < next.pagination.total_count ?
                    this.offset = toSet :
                    this.offset = 0;
                this.loading = false;
            },
            _ => {
                this.error = true;
                this.loading = false;
            }
        );
    }
}