import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { map, Observable, Subscriber } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  client_id:string = '';
  client_secret: string ='';
  redirect_uri:string = 'http://localhost:4200/';
  TOKEN:string = 'https://accounts.spotify.com/api/token';
  access_token !: any;
  refresh_token !: string|null;
  user_id!: string|null;
  items = [];
  data = [];
  recentArray = [];
  lastplayed: any;
  btnVal = false;

  constructor(private http:HttpClient, private router: Router, private dataService:DataService) {
    setInterval(()=> { this.loadRecentlyPlayed() }, 60000);
    setInterval(()=> { this.checkStatus() }, 60000);
  }

  checkStatus() {
    if(this.access_token == undefined) {
      return this.btnVal = false;
    }
    else {
      return this.btnVal = true
    }
  }

  requestAuthorization() {
    const scope = 'user-read-recently-played user-read-email playlist-modify-public playlist-modify-private';
    const url = 'https://accounts.spotify.com/authorize?';
    const show_dialog = 'true';
 
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.client_id,
      scope: scope,
      redirect_uri: this.redirect_uri
    });
    window.location.href = url+params;
  }

  handleRedirect(){
    let code = this.getCode();
    let body = this.getAuthToken(code);
    this.callAuthorizationApi(body).subscribe(res  => {
      this.access_token = res.access_token;
      localStorage.setItem("refresh_token", res.refresh_token);
      console.log(res);
    });
    this.checkStatus();
  }

  getCode() {
    let code !:  string;
    const codeurl = window.location.search;
    if (codeurl.length > 0) {
      const urlParams = new URLSearchParams(codeurl);
      code = urlParams.get('code')!;
    }
      return code;
  }

  getAuthToken(code:string) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(this.redirect_uri);
    body += "&client_id=" + this.client_id;
    body += "&client_secret=" + this.client_secret;
    return body;
   }
 
   getRefreshToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            return reject(new Error("No refresh token found"));
        }

        const body = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${this.client_id}`;

        this.callAuthorizationApi(body).subscribe({
            next: (res: any) => {
                if (res && res.access_token) {
                    this.access_token = res.access_token;
                    resolve(this.access_token);
                } else {
                    reject(new Error("Invalid response from authorization API"));
                }
            },
            error: (error: any) => {
                reject(error);
            }
        });
    });
}



   loadRecentlyPlayed() {
    this.getRecentlyPlayed().subscribe((res: any) => {
      this.recentArray = [];
      let json = JSON.parse(res); 
      let data = json.items;
      this.dataService.getLastPlayed().subscribe(res => {
        let testLast = res.data[0].last_played;
        this.computeData(data, testLast);
      });
      return this.recentArray = data;
    });
  }

  computeData(data:any, lastPlayed: any) {  
    for (let i=0;i < data.length; i++) {
        let time = new Date(data[i].played_at);
        let formattedTime = time.getFullYear() + '-' +
        ('00' + (time.getMonth()+1)).slice(-2) + '-' +
        ('00' + time.getDate()).slice(-2) + ' ' + 
        ('00' + time.getHours()).slice(-2) + ':' + 
        ('00' + time.getMinutes()).slice(-2) + ':' + 
        ('00' + time.getSeconds()).slice(-2);

        let trackid = data[i].track.id;
        let albumid = data[i].track.album.id;
        let artists = data[i].track.artists;
        
        let lastTime = new Date(lastPlayed);

        let formattedLastPlayed = lastTime.getFullYear() + '-' +
        ('00' + (lastTime.getMonth()+1)).slice(-2) + '-' +
        ('00' + lastTime.getDate()).slice(-2) + ' ' + 
        ('00' + lastTime.getHours()).slice(-2) + ':' + 
        ('00' + lastTime.getMinutes()).slice(-2) + ':' + 
        ('00' + lastTime.getSeconds()).slice(-2);

        if (formattedTime != formattedLastPlayed) {
        let trackArray = {trackID : trackid,playedAt: time};
        let albumArray = {albumID: albumid, playedAt: time};
        this.dataService.createData(trackArray).subscribe();
        this.dataService.createAlbumData(albumArray).subscribe();

        for( let x in artists) {
          let artistID = artists[x].id;
          let artistArray = {artistID: artistID, playedAt: time};
          this.dataService.createArtistData(artistArray).subscribe();
          this.getArtistApiData(artistID).subscribe(res => {
            let artist = JSON.parse(res);
            let genres = artist.artists[0].genres;
            for ( let y in genres) {
              let genre = genres[y];
              let genreArray = {genre: genre, playedAt:time};
              this.dataService.createGenreData(genreArray).subscribe();
            }
          })
      }
      }
      else{
        break;
      }
      }
      let latestUpdateTime = new Date(data[0].played_at);
        let formattedLatestTime = {playedAt: latestUpdateTime.getFullYear() + '-' +
        ('00' + (latestUpdateTime.getMonth()+1)).slice(-2) + '-' +
        ('00' + latestUpdateTime.getDate()).slice(-2) + ' ' + 
        ('00' + latestUpdateTime.getHours()).slice(-2) + ':' + 
        ('00' + latestUpdateTime.getMinutes()).slice(-2) + ':' + 
        ('00' + latestUpdateTime.getSeconds()).slice(-2)}
      this.dataService.updateLastPlayed(formattedLatestTime).subscribe();   
  }

  getUserDetails(access_token:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/me', httpOptions);
  }

  addToPlaylist(playlist_id: any, tracks: any):Observable<any> {
    const body = "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.post<any>('https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks?uris=spotify%3Atrack%3A' + tracks,body, httpOptions);
  }

  getPlaylists(user_id:string|null) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/users/' + user_id +'/playlists', httpOptions);
  }

  getRecentlyPlayed(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>(
      'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      httpOptions);
  }

  getSearch(search:any,type:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/search?q=' + search + "&type=" + type + "&market=ca", httpOptions);
  }

  getSongData(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/tracks?ids=' + id, httpOptions);
  }

  getArtistApiData(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/artists?ids=' + id, httpOptions);
  }

  getAlbumApiData(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/albums?ids=' + id, httpOptions);
  }

  getRecommendations(seedArtists:any,seedGenres:any,seedTracks:any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer ' + this.access_token
      }),
      responseType: 'text' as 'json'
    }
    return this.http.get<any>('https://api.spotify.com/v1/recommendations?seed_artists=' + seedArtists + "&seed_genres=" + seedGenres + "&seed_tracks=" + seedTracks, httpOptions);
  }

   callAuthorizationApi(body:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic ' + Buffer.from(this.client_id + ":" + this.client_secret).toString('base64'),
      })
    };
    return this.http.post<any>(
    'https://accounts.spotify.com/api/token',body,
    httpOptions
    );
    }

    handleAuthToken(response:any): Observable<any> {
      localStorage.setItem("access_token", response.access_token!);
      localStorage.setItem("refresh_token", response.refresh_token!);
      return this.access_token = response.access_token;
  }

handleRefreshToken(response:any) : Observable<any> {
    return this.refresh_token = response.refresh_token;
  }

}
