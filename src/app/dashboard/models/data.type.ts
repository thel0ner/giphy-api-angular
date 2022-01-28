import { GiphyRatings } from "../enums/rating.enum";
import { GiphyImages } from "./images.type";
import { GiphyUser } from "./user.type";

export type GiphyDataType = {
    type: string,
    id: string,
    slug: string,
    url: string,
    bitly_url: string,
    embed_url: string,
    username: string,
    source: string,
    rating: GiphyRatings,
    user: GiphyUser,
    source_tld: string,
    source_post_url: string,
    update_datetime: string,
    create_datetime: string,
    import_datetime: string,
    trending_datetime: string,
    images:GiphyImages,
    title: string
};