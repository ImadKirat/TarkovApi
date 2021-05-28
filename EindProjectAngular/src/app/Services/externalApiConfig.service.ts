import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
 providedIn: 'root'
})
export class externalApiConfig
{
    status;
    errormessage;
    constructor(private http : HttpClient) { }

    readonly httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'my-auth-token'
        })
      };
    GetTarkovItemImage(itemName:string) : Promise<RootObject>{
        const headers = { 'Accept': '*/*'};
        return this.http.get<RootObject>(this.CreateUrl(itemName)).toPromise();
    }
    CreateUrl(itemName: string) : string
    {
        return "https://www.googleapis.com/customsearch/v1?key=AIzaSyD_rQf1Qil2IUNTEpeOqF_sOd_DxiZs67Y&cx=306c1e37a67b6744f&num=1&q="  +itemName +" tarkov escape from tarkov wikia | fandom&safe=off&searchType=image"
    }
 
}


export interface Url {
    type: string;
    template: string;
}

export interface Request {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
    searchType: string;
}

export interface NextPage {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
    searchType: string;
}

export interface Queries {
    request: Request[];
    nextPage: NextPage[];
}

export interface Context {
    title: string;
}

export interface SearchInformation {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
}

export interface Image {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
}

export interface Item {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    mime: string;
    fileFormat: string;
    image: Image;
}

export interface RootObject {
    kind: string;
    url: Url;
    queries: Queries;
    context: Context;
    searchInformation: SearchInformation;
    items: Item[];
}