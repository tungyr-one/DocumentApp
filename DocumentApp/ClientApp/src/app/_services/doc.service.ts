import { Injectable } from '@angular/core';
import { Doc } from '../_models/Doc';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  baseUrl = environment.apiUrl;
  docs: Doc[] = [];  

  constructor(private http: HttpClient) {
  }

  getDocuments()
  {
    return this.http.get<Doc[]>(this.baseUrl + 'docs').pipe(
      map((docs:Doc[]) => {
        return docs;
      }))
  }

  getDocument(id:string)
  {
    const doc = this.docs.find(x => x.id === +id);
    if (doc != undefined) return of(doc);
    return this.http.get<Doc>(this.baseUrl + 'docs/'+ id).pipe(
      map((doc:Doc) => {
        // TODO to much calls to back!
        // console.log(doc);
        return doc;
      }));
    // return this.http.get<Doc>(this.baseUrl + 'docs/'+ id);
  }

  UpdateDocument(id:string, model:any){
    return this.http.put(this.baseUrl + 'docs/'+ id, model)
    // .pipe(
    //   map((user:Doc) => {
    //     if (doc) {
    //       this.setCurrentUser(user);
    //     }
    //     return user;
    //   })
    // )
  }


}
