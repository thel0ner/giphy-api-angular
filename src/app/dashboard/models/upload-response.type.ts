import { GiphyMetaType } from "./meta-type";

export type UploadResponse = {
    data :{
        id:string
    },
    meta: GiphyMetaType
};