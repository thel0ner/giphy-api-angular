import { GiphyMetaType } from "./meta-type";

export type AutoCompleteDataType={
    name:string,
};

export type GiphyAutoCompleteResponse = {
    data: AutoCompleteDataType[],
    meta: GiphyMetaType,
};
