import { UserParams } from './../_models/userParams';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Pagination } from '../_models/Pagination';
import { Doc } from '../_models/Doc';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  baseUrl = environment.apiUrl;
  docs: Doc[] = [];

  constructor(private http: HttpClient) {
  }

  getDocuments(userParams:UserParams)
  {
    console.log('docs service userParams: ', userParams);
    return this.http.post<Pagination>(this.baseUrl + 'docs', userParams).pipe(
      map((result:Pagination) => {
        console.log('docs service: ', result.items);
        console.log('docs tot page: ', result.countPages);
        return result;
      }))
    }

    // getDocuments()
    // {
    //   return this.http.get<Doc[]>(this.baseUrl + 'docs').pipe(
    //     map((docs:Doc[]) => {
    //       return docs;
    //     }))
    // }

    getDocument(id:number)
  {
    const doc = this.docs.find(x => x.id === +id);
    if (doc != undefined) return of(doc);
    return this.http.get<Doc>(this.baseUrl + 'docs/' + id).pipe(
      map((doc:Doc) => {
        return doc;
      }));
  }

  createDocument(model:Doc){
    return this.http.post(this.baseUrl + 'docs/new', model)
  }

  updateDocument(id:number, model:Doc){
    return this.http.put(this.baseUrl + 'docs/'+ id, model)
  }

  deleteDocument(id:number){
    return this.http.delete(this.baseUrl + 'docs/'+ id)
  }
}
