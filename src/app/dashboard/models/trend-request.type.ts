import { GiphyRatings } from "../enums/rating.enum";

export type GiphyTrendRequest = {
    limit: number,
    offset: number,
    rating?: GiphyRatings,
    random_id?: string,
    bundle?:string,
};
