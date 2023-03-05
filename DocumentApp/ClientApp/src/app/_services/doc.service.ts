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

  getDocument(id:number)
  {
    const doc = this.docs.find(x => x.id === +id);
    if (doc != undefined) return of(doc);
    return this.http.get<Doc>(this.baseUrl + 'docs/' + id).pipe(
      map((doc:Doc) => {
        return doc;
      }));
  }

  createDocument(model:any){
    model.Created = new Date();
    return this.http.post(this.baseUrl + 'docs/', model)
  }

  updateDocument(id:number, model:any){
    return this.http.put(this.baseUrl + 'docs/'+ id, model)
  }

  deleteDocument(id:number){
    return this.http.delete(this.baseUrl + 'docs/'+ id)
  }
}
