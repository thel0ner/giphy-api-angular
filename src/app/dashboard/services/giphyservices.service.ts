import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GiphyConfig } from '../config/giphy';
import { GiphyAutoCompleteResponse } from '../models/autocomplete.type';
import { GiphyGifByIdResponseType } from '../models/gif_byid.type';
import { GiphySearchType } from '../models/search.type';
import { GiphyTrendRequest } from '../models/trend-request.type';
import { GiphyTrendType } from '../models/trend.type';
import { UploadResponse } from '../models/upload-response.type';

@Injectable()
export class GiphyService {
  private config = GiphyConfig;
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * fetchs trends from Giphy
   * @param payload 
   * @returns list of trends
   */
  public getTrends(payload: GiphyTrendRequest): Observable<GiphyTrendType> {
    const params = new HttpParams()
      .set("api_key", this.config.apiKey)
      .set("limit", `${payload.limit}`)
      .set("offset", `${payload.offset}`)
      .set("rating", `${payload.rating}`);
    return this.httpClient.get<GiphyTrendType>(
      `${this.config.url}/trending`,
      {
        params
      }
    );
  }

  /**
   * provides sugestions for autocompelete
   * @param q query
   * @returns suggestions
   */
  public autoComplete(q: string): Observable<GiphyAutoCompleteResponse> {
    const params = new HttpParams()
      .set("api_key", this.config.apiKey)
      .set("q", q);
    return this.httpClient.get<GiphyAutoCompleteResponse>(
      `${this.config.url}/search/tags`,
      {
        params
      }
    )
  }

  /**
   * @description searches for query from Giphy
   * @param q query
   * @param offset 
   * @returns search results
   */
  public search(q: string,offset = 0): Observable<GiphySearchType> {
    const params = new HttpParams()
      .set("api_key", this.config.apiKey)
      .set("q", q)
      .set("offset",offset);
    return this.httpClient.get<GiphySearchType>(
      `${this.config.url}/search`,
      {
        params
      }
    );
  }

  /**
   * @description simply uploads file to giphy
   * @param file selected file
   * @returns info of uploaded file
   */
  public upload(file: File): Observable<UploadResponse> {
    const headers = new HttpHeaders();
    headers.append("content-type", "multipart/form-datas");
    const request = new FormData();
    request.append('file',file,file.name);
    const params = new HttpParams()
      .set("api_key", this.config.apiKey)
      .set("username",this.config.userName);
    return this.httpClient.post<UploadResponse>(
      `${this.config.upload_url}`,
      request,
      {
        params,
        reportProgress: true,
        headers
      }
    );
  }

  /**
   * @description retrives info of gif
   * @param gif_id id of gif
   * @returns gif info
   */
  public getFileById(gif_id:string):Observable<GiphyGifByIdResponseType>{
    const params = new HttpParams()
      .set("api_key", this.config.apiKey)
      .set("gif_id", gif_id); 
    return this.httpClient.get<GiphyGifByIdResponseType>(
      `${this.config.url}/${gif_id}`,
      {
        params
      }
    )
  }
}
