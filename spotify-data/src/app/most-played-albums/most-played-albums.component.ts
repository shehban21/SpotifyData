import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concatAll } from 'rxjs';
import { DataService } from '../Services/data.service';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-most-played-albums',
  templateUrl: './most-played-albums.component.html',
  styleUrls: ['./most-played-albums.component.scss']
})
export class MostPlayedAlbumsComponent implements OnInit {

  constructor(private login:LoginServiceService, private http:HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  recentArray: any[] = [];
  count: any[] = [];

  getData() {
    this.dataService.getAlbumData().subscribe((res:any) => {
      let responseData = res.data;
      let albumsReq = "";
      for ( let x in responseData ) {
        if( parseInt(x) + 1 < responseData.length) {
        this.count.push(responseData[x].count);
         albumsReq = albumsReq + responseData[x].albumID + "%2C";
        }
        else {
          this.count.push(responseData[x].count);
          albumsReq = albumsReq + responseData[x].albumID;
        }
      }
      this.login.getAlbumApiData(albumsReq).subscribe((result: any) => {
        let json = JSON.parse(result);
        this.recentArray = json.albums;
        this.recentArray.push(this.count);
      })
    });
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
