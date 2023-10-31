import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FetchanswerService {
  API:string="http://127.0.0.1:50979";
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}


  getAnswerForQs(form: FormData) {
    return this.http.post<any>(`${this.API}/getAnswer`, form, {
      observe: 'response',
    });
  }
}
