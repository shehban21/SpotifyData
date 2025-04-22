import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-most-played-tracks',
  templateUrl: './most-played-tracks.component.html',
  styleUrls: ['./most-played-tracks.component.scss']
})
export class MostPlayedTracksComponent implements OnInit {

  constructor(private http: HttpClient, private login: LoginServiceService, private dataService:DataService) {

   }

  ngOnInit(): void {
    this.getData();
  }

  recentArray: any[] = [];
  count: any[] = [];
  state = 'paused';

  sortlastmonth() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getData('month').subscribe((res:any) => {
      let responseData = res.data;
      let tracksReq = "";
      for ( let x in responseData ) {
        if( parseInt(x) + 1 < responseData.length) {
        this.count.push(responseData[x].count);
         tracksReq = tracksReq + responseData[x].trackID + "%2C";
        }
        else {
          this.count.push(responseData[x].count);
          tracksReq = tracksReq + responseData[x].trackID;
        }
      }
      this.login.getSongData(tracksReq).subscribe({
        next: (result: any) => {
        let json = JSON.parse(result);
        this.recentArray = json.tracks;
        this.recentArray.push(this.count);
        console.log(this.recentArray);
      },error: (error) => {
        switch(error.status) {
          case 401:
            this.login.getRefreshToken();
            this.getData();
            break;
        }
      }});
    });
    
  }

  sortlast6month() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getData('6months').subscribe((res:any) => {
      let responseData = res.data;
      let tracksReq = "";
      for ( let x in responseData ) {
        if( parseInt(x) + 1 < responseData.length) {
        this.count.push(responseData[x].count);
         tracksReq = tracksReq + responseData[x].trackID + "%2C";
        }
        else {
          this.count.push(responseData[x].count);
          tracksReq = tracksReq + responseData[x].trackID;
        }
      }
      this.login.getSongData(tracksReq).subscribe({
        next: (result: any) => {
        let json = JSON.parse(result);
        this.recentArray = json.tracks;
        this.recentArray.push(this.count);
        console.log(this.recentArray);
      },error: (error) => {
        switch(error.status) {
          case 401:
            this.login.getRefreshToken();
            this.getData();
            break;
        }
      }});
    });
    
  }

//   playAudio(index: number) {
//     this.isPlaying = !this.isPlaying;
//     const audioElement = document.getElementById('preview_' + index) as HTMLAudioElement;
//     if (audioElement) {
//         if (audioElement.paused) {
//             audioElement.play();
//         } else {
//             audioElement.pause();
//         }
//     }
// }

  getData() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getData('alltime').subscribe((res:any) => {
      let responseData = res.data;
      let tracksReq = "";
      for ( let x in responseData ) {
        if( parseInt(x) + 1 < responseData.length) {
        this.count.push(responseData[x].count);
         tracksReq = tracksReq + responseData[x].trackID + "%2C";
        }
        else {
          this.count.push(responseData[x].count);
          tracksReq = tracksReq + responseData[x].trackID;
        }
      }
      this.login.getSongData(tracksReq).subscribe({
        next: (result: any) => {
        let json = JSON.parse(result);
        this.recentArray = json.tracks;
        this.recentArray.push(this.count);
        console.log(this.recentArray);
      },error: (error) => {
        switch(error.status) {
          case 401:
            this.login.getRefreshToken();
            this.getData();
            break;
        }
      }});
    });
  }
}
