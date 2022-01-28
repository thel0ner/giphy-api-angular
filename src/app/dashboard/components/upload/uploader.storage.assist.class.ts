import { GiphyDataType } from "../../models/data.type";

export abstract class UploadStorageAssistant{
    private db_id = 'uploaded_items';
    constructor(){}

    protected fetchDB():string[]{
        const check = localStorage.getItem(this.db_id);
        if(check !== null){
            const temp:string[] = JSON.parse(check);
            return temp;
        }
        return [];
    }

    protected updateDB(items:string[]){
        let current = this.fetchDB();
        current = current.concat(items);
        localStorage.removeItem(this.db_id);
        localStorage.setItem(this.db_id,JSON.stringify(current));
    }
}