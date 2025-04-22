import { Component,Inject, NgZone, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { LoginServiceService } from '../Services/login-service.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { MostPlayedByArtistComponent } from '../most-played-by-artist/most-played-by-artist.component';

@Component({
  selector: 'app-most-played-artists',
  templateUrl: './most-played-artists.component.html',
  styleUrls: ['./most-played-artists.component.scss'],
})
export class MostPlayedArtistsComponent implements OnInit {
  constructor(
    private login: LoginServiceService,
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  recentArray: any[] = [];
  count: any[] = [];
  name:any;

  sortMonth() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getArtistData('month').subscribe((res: any) => {
      let responseData = res.data;
      let artistsReq = '';
      for (let x in responseData) {
        if (parseInt(x) + 1 < responseData.length) {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID + '%2C';
        } else {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID;
        }
      }
      this.login.getArtistApiData(artistsReq).subscribe({
        next: (result: any) => {
          let json = JSON.parse(result);
          this.recentArray = json.artists;
          this.recentArray.push(this.count);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this.login.getRefreshToken();
              this.getData();
              break;
          }
        },
      });
    });
  }

  openDialog():void {
  this.dialog.open(MostPlayedByArtistComponent, {
    data: {
      'title':'author'
    }
  });
  }

  sort6Months() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getArtistData('6months').subscribe((res: any) => {
      let responseData = res.data;
      let artistsReq = '';
      for (let x in responseData) {
        if (parseInt(x) + 1 < responseData.length) {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID + '%2C';
        } else {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID;
        }
      }
      this.login.getArtistApiData(artistsReq).subscribe({
        next: (result: any) => {
          let json = JSON.parse(result);
          this.recentArray = json.artists;
          this.recentArray.push(this.count);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this.login.getRefreshToken();
              this.getData();
              break;
          }
        },
      });
    });
  }

  getData() {
    this.recentArray = [];
    this.count = [];
    this.dataService.getArtistData('alltime').subscribe((res: any) => {
      let responseData = res.data;
      let artistsReq = '';
      for (let x in responseData) {
        if (parseInt(x) + 1 < responseData.length) {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID + '%2C';
        } else {
          this.count.push(responseData[x].count);
          artistsReq = artistsReq + responseData[x].artistID;
        }
      }
      this.login.getArtistApiData(artistsReq).subscribe({
        next: (result: any) => {
          let json = JSON.parse(result);
          this.recentArray = json.artists;
          this.recentArray.push(this.count);
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this.login.getRefreshToken();
              this.getData();
              break;
          }
        },
      });
    });
  }
}
