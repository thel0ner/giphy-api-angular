import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { filter, tap } from 'rxjs/operators';
import { GiphyRatings } from "../../enums/rating.enum";
import { GiphyMetaType } from "../../models/meta-type";
import { GiphyPaginationType } from "../../models/pagination.type";
import { GiphyTrendRequest } from "../../models/trend-request.type";
import { GiphyTrendType } from "../../models/trend.type";
import { GiphyService } from "../../services/giphyservices.service";

export abstract class TrendsAssist {
    protected subs: Subscription[] = [];
    form!: FormGroup;
    response: GiphyTrendType = {
        data: [],
        meta: {} as GiphyMetaType,
        pagination: {} as GiphyPaginationType
    };
    loading = false;
    error = false;
    defaults = {
        limit: 12,
        offset: 0,
        rating: GiphyRatings.g
    };
    isEnd = false;
    constructor(
        private fb: FormBuilder,
        private giphyService: GiphyService,
    ) {

    }

    private getTrends$(): Observable<GiphyTrendType> {
        this.loading = true;
        this.error = false;
        const payload: GiphyTrendRequest = this.form.getRawValue();
        return this.giphyService.getTrends(payload);
    }

    private updateFormOnResult(pagination: GiphyPaginationType): void {
        const currentLimit = +this.form.get('limit')?.value ;
        const offset = (pagination.offset + 1) + currentLimit;
        this.form.get('offset')?.setValue(offset);
        this.isEnd = offset >= pagination.total_count;
    }

    /**
     * @description initializes the form
     */
    protected initForm(): void {
        this.form = this.fb.group({
            limit: [this.defaults.limit],
            offset: [this.defaults.offset],
            rating: [this.defaults.rating],
        });
    }

    /**
     * fetchs trends
     */
    protected fetchTrends(): void {
        this.loading = true;
        this.getTrends$().subscribe(
            next => {
                this.updateFormOnResult(next.pagination);
                this.response.data = this.response.data.concat(next.data);
                this.loading = false;
            },
            _ => this.error = true,
            () => this.loading = false
        );
    }

    /**
     * start dubscription on form, therefore can make new requests based on form changes
     */
    protected startSubscribers(){
        const ratingListener$ = this.form.get('rating')?.valueChanges.pipe(
            tap(_ => this.response.data = []),
            tap(_ => this.form.get('offset')?.setValue(this.defaults.offset))
        ).subscribe(
            _ => this.fetchTrends()
        );
        this.subs.push(ratingListener$ as Subscription);
    }


}
