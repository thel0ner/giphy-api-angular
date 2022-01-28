import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { UploadStorageAssistant } from "./uploader.storage.assist.class";

export abstract class UploadStateManager extends UploadStorageAssistant{
    private refreshStateHolder: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor() { 
        super();
    }

    get state(): Observable<number> | number {
        return this.refreshStateHolder.asObservable().pipe(
            filter(state => state > 0)
        );
    }

    set state(inpt: number | Observable<number>) {
        this.refreshStateHolder.next(inpt as number);
    }
}