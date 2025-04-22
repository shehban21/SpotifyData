import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { LoginServiceService } from '../Services/login-service.service';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Track } from '../track';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  recentArray: any[] = [];
  data: Track[] = [];
  access_token !: any;
  refresh_token !: any;
  user_id !: string | null;
  playlistArray: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdown ?: NgMultiSelectDropDownModule;
  selectedTracksArray: any[] = [];
  selectedPlaylistArray: any[] = [];
  msg !: string | null;

  constructor(private login: LoginServiceService, private router: Router, private dataService:DataService) {
    setInterval(() => { this.loadRecentlyPlayed() }, 300000);
  }

  ngOnInit(): void {
    this.loadRecentlyPlayed();
    this.login.getRefreshToken().then(acc => {
      console.log(acc);
      this.login.getUserDetails(acc).subscribe(res => {
        let json = JSON.parse(res);
        this.user_id = json.id;
        this.login.getPlaylists(this.user_id).subscribe(res => {
          let json = JSON.parse(res);
          this.playlistArray = json.items;
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name'
          };
        })
      });
    });
  }

  onItemSelect(item: any, song: any) {
    console.log(item, song)
    let trackToPlaylist = {
      "playlist_id": item.id,
      "track_id": song
    }
    this.selectedPlaylistArray.push(trackToPlaylist);
  }

  addToPlaylist() {
    for (let x in this.selectedPlaylistArray) {
      console.log(this.selectedPlaylistArray);
      this.login.addToPlaylist(this.selectedPlaylistArray[x].playlist_id, this.selectedPlaylistArray[x].track_id).subscribe();
      this.msg = "Added to Playlist";
    }
    this.loadRecentlyPlayed();
    this.selectedPlaylistArray = [];
  }

  loadRecentlyPlayed() {
    this.login.getRecentlyPlayed().subscribe({
      next: (v) => {
        this.recentArray = [];
        let json = JSON.parse(v);
        let data = json.items;
        this.dataService.getLastPlayed().subscribe(res => {
          let testLast = res.data[0].last_played;
          this.login.computeData(data, testLast);
        });
        return this.recentArray = data;
      }, error: (error: any) => { 
        switch (error.status) {
              case 401:
                this.login.getRefreshToken();
                this.loadRecentlyPlayed();
                break;
            }
      }, complete: () => { }
    });
  }
}
