import { NgxFileDropEntry, FileSystemFileEntry } from "ngx-file-drop";
import { EMPTY, forkJoin, from, Observable, of, OperatorFunction, Subscription } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { GiphyGifByIdResponseType } from "../../models/gif_byid.type";
import { UploadResponse } from "../../models/upload-response.type";
import { GiphyService } from "../../services/giphyservices.service";
import { UploadStateManager } from "./upload.state.class";

export abstract class UploadAssistant extends UploadStateManager {
    protected subs: Subscription[] = [];
    files: File[] = [];
    loading = false;
    toShow:GiphyGifByIdResponseType[] = [];
    error = false;
    constructor(
        private giphyServices: GiphyService,
    ) {
        super();
    }

    private errorHandler():OperatorFunction<any,any> {
        return catchError(error => of(error).pipe(
            tap(_ => {
                this.loading = false;
                this.error = true;
            }),
            switchMap(_ => EMPTY)
        ));
    }

    private gatherSelectedFiles(files: NgxFileDropEntry[]) {
        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.files.push(file);
                });
            }
        }
    }

    private prepareRequestsQue(files: File[]): Observable<UploadResponse>[] {
        const answer: Observable<UploadResponse>[] = [];
        files.forEach(file => answer.push(this.giphyServices.upload(file).pipe(
            this.errorHandler()
        )));
        return answer;
    }

    private async getFiles$(files: File[]): Promise<File[]> {
        return new Promise(
            (resolve) => {
                const filesBinaryInfo: File[] = [];
                files.forEach(file => filesBinaryInfo.push(file));
                resolve(filesBinaryInfo);
            }
        );
    }

    private addFilesToDownloadQue(items:string[]):Observable<GiphyGifByIdResponseType>[]{
        const answer: Observable<GiphyGifByIdResponseType>[] = [];
        items.forEach(item => answer.push(
            this.giphyServices.getFileById(item).pipe(
                this.errorHandler()
            )
        ));
        return answer;
    }

    /**
     * @description inits page based on previously uploaded pics recorded in db
     */
    protected init(){
        const items:string[] = this.fetchDB();
        if(items.length > 0) {
            this.loading = true;
            forkJoin(this.addFilesToDownloadQue(items)).subscribe(
                next => {
                    this.loading = false;
                    this.toShow = next;
                }
            );
        }
    }

    /**
     * @description listens for state changes
     */
    protected subscribers():void{
        const stateListener$ = (this.state as Observable<number>).pipe(
            map(_ => this.fetchDB()),
            tap(_ => this.loading = true),
            switchMap(items => forkJoin(this.addFilesToDownloadQue(items))),
            // tap(next => console.log(next)),
        ).subscribe(
            next => {
                this.loading = false;
                this.toShow = next
            },
            _ => {
                this.error = true;
                this.loading = false;
            }
        );
        this.subs.push(stateListener$);
    }

    /**
     * upload files
     * @param files selected files
     */
    public filedropped(files: NgxFileDropEntry[]): void {
        this.error = false;
        this.loading = true;
        this.gatherSelectedFiles(files);
        from(this.getFiles$(this.files)).pipe(
            switchMap(files_info => forkJoin(this.prepareRequestsQue(files_info)))
        ).subscribe(
            next => {
                this.loading = false;
                this.updateDB(next.map(item => item.data.id));
                this.state = Math.random();
                this.files = [];
            },
            error => {
                this.loading = false;
                this.error = true;
                this.files = [];
            },
        );
    }
}