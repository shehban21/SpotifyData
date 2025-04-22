import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  updateLastPlayed(data:any): Observable<any> {
    return this.http.put<any>('http://localhost:3050/lastplayed',data)
  }

  getLastPlayed():Observable<any> {
    return this.http.get<any>('http://localhost:3050/lastplayed');
  }

  createData(data:any): Observable<any> {
    return this.http.post<any>('http://localhost:3050/user',data);
  }

  createAlbumData(data:any):Observable<any> {
    return this.http.post<any>('http://localhost:3050/album',data);
  }

  getAlbumData():Observable<any> {
    return this.http.get<any>('http://localhost:3050/mostplayedalbums');
  }

  createArtistData(data:any):Observable<any> {
    return this.http.post<any>('http://localhost:3050/artists',data);
  }

  getArtistData(time:any):Observable<any> {
    return this.http.get<any>('http://localhost:3050/mostplayedartists' + time);
  }

  createGenreData(data:any):Observable<any> {
    return this.http.post<any>('http://localhost:3050/genres',data);
  }

  getGenreData():Observable<any> {
    return this.http.get<any>('http://localhost:3050/mostplayedgenres');
  }

  getData(time:any):Observable<any> {
    return this.http.get<any>('http://localhost:3050/mostplayedtracks' + time);
  }
}

