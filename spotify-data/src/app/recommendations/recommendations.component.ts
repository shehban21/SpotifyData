import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataService } from '../Services/data.service';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  constructor(private login: LoginServiceService, private dataService: DataService) {

   }

  ngOnInit(): void {
    this.login.getRefreshToken().then(acc => {
      console.log(acc);
      this.login.getUserDetails(acc).subscribe(res => {
        console.log(res);
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
    this.getSeeds();
  }

  dropdown ?: NgMultiSelectDropDownModule;
  access_token !: any;
  user_id !: string | null;
  playlistArray: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  seedArtists !: string | null;
  seedTracks !: string | null;
  seedGenres !: string | null;
  seedArtist: any[] = [];
  seedGenre: any[] = [];
  seedTrack: any[] = [];
  recommendationArray: any[] = [];
  selectedPlaylistArray: any[] = [];
  selectedTracksArray: any[] = [];
  msg !: string | null;

  onItemSelect(item: any, song: any) {
    console.log(item, song)
    let trackToPlaylist = {
      "playlist_id": item.id,
      "track_id": song
    }
    this.selectedPlaylistArray.push(trackToPlaylist);
  }

  getSeeds() {
    this.dataService.getArtistData('alltime').subscribe((res) => {
      for (let i = 0; i < 5; i++) {
        let artist = res.data[i].artistID;
        this.seedArtist.push(artist);
      }
      this.dataService.getData('alltime').subscribe((res) => {
        for (let i = 0; i < 5; i++) {
          this.seedTrack.push(res.data[i].trackID)
        }
        this.dataService.getGenreData().subscribe((res) => {
          for (let i = 0; i < 5; i++) {
            this.seedGenre.push(res.data[i].genre)
          }
          this.getRecommendations(this.getMultipleRandom(this.seedArtist, 1), this.getMultipleRandom(this.seedGenre, 1), this.getMultipleRandom(this.seedTrack, 1));
        })
      })
    })
  }

  addToPlaylist() {
    for (let x in this.selectedPlaylistArray) {
      console.log(this.selectedPlaylistArray);
      this.login.addToPlaylist(this.selectedPlaylistArray[x].playlist_id, this.selectedPlaylistArray[x].track_id).subscribe();
      this.msg = "Added to Playlist";
    }
    (this.dropdown as any).value = null;
    this.selectedPlaylistArray = [];
  }
  
  getMultipleRandom(arr: any[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  getRecommendations(seedArtists: any, seedGenres: any, seedTracks: any) {
    this.login.getRecommendations(seedArtists, seedGenres, seedTracks).subscribe({
      next: (res) => {
        let json = JSON.parse(res);
        this.recommendationArray = json.tracks;
      }, error: (error: any) => {
        switch (error.status) {
          case 401:
            this.login.getRefreshToken();
            this.getRecommendations(seedArtists, seedGenres, seedTracks);
            break;
        }
      }
    })
  }
}
