import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FetchanswerService {
  API:string="http://127.0.0.1:56469";
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}
  getAnswerForQs(form: FormData) {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
    const headers = new HttpHeaders({
      "Lat":"10.592109",
      "Long":"79.057093"
    });
    return this.http.post<any>(`${this.API}/getAnswer`, form, {
      headers: headers,
      observe: 'response',
    });
  }
}
