import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Memo} from "../../decorators/memoization.decorator";

@Injectable({
  providedIn: 'root',
})
export class PrivilegeService {

  constructor(private http: HttpClient) { }

  @Memo
  public hasBasicAuth(): Observable<boolean> {
    const out = Math.random() < 0.5;
    return this.http.get<{ message: boolean }>(`https://dummyjson.com/http/200/${out}`).pipe(map(o => o.message));
  }

  @Memo
  public hasAuthFor(component: string): Observable<boolean> {
    const out = Math.random() < 0.5;
    return this.http.get<{ message: boolean }>(`https://dummyjson.com/http/200/${out}`).pipe(map(o => o.message));
  }

}
