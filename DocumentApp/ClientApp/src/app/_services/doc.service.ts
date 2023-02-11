import { Injectable } from '@angular/core';
import { Doc } from '../_models/doc';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  baseUrl = environment.apiUrl;
  Docs$: Observable<Doc[]>;

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

  getDoc(id:string)
  {
    const doc = this.docs.find(x => x.id === +id);
    if (doc != undefined) return of(doc);
    return this.http.get<Doc>(this.baseUrl + 'docs/'+ id);
  }
}
