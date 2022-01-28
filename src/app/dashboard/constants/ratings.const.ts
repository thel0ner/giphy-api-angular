import { GiphyRatings } from "../enums/rating.enum";
import { Constants } from "../models/constants.interface";

export const ratingsConst:Constants<GiphyRatings,string>[] = [
    {
        id: GiphyRatings.g,
        data: 'Level 1'
    },
    {
        id: GiphyRatings.pg,
        data: 'Level 2'
    },
    {
        id: GiphyRatings.pg13,
        data: 'Level 3'
    },
    {
        id: GiphyRatings.r,
        data: 'Level 4'
    }
];