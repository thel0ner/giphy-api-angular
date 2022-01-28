import { GiphyDataType } from "./data.type";
import { GiphyMetaType } from "./meta-type";
import { GiphyPaginationType } from "./pagination.type";

export type GiphyTrendType = {
    data: GiphyDataType[],
    pagination: GiphyPaginationType,
    meta: GiphyMetaType
};