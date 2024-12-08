import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocode(location: string): Observable<any> {
    const params = {
      q: location,
      format: 'json',
      addressdetails: '1',
      limit: '1',
    };
    return this.http.get<any>(this.baseUrl, { params });
  }
}
