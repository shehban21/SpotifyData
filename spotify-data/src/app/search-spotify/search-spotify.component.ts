import { computeMsgId } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-search-spotify',
  templateUrl: './search-spotify.component.html',
  styleUrls: ['./search-spotify.component.scss']
})
export class SearchSpotifyComponent implements OnInit {

  constructor(private login: LoginServiceService) { }

  ngOnInit(): void {

  }

  searchTrackAnswer = false;
  searchArtistAnswer = false;
  searchAlbumAnswer = false;
  searchArray: any[] = [];

  getSearch() {
    this.searchTrackAnswer = false;
    this.searchArtistAnswer = false;
    this.searchAlbumAnswer = false;
    const search = document.getElementById('search') as HTMLInputElement | null;
    const type = document.getElementById('searchType') as HTMLInputElement | null;
    let search_term = search?.value;
    let search_type = type?.value;
    this.searchArray = [];
    if (search_type == "track") {
      this.login.getSearch(search_term, search_type).subscribe((res) => {
        let json = JSON.parse(res);
        let items = json.tracks.items;
        for (let i = 0; i < items.length; i++) {
          this.searchArray.push(items[i])
        }
        console.log(this.searchArray);
        this.searchTrackAnswer = true
      })
    }
    else if (search_type == "artist") {
      this.login.getSearch(search_term, search_type).subscribe((res) => {
        let json = JSON.parse(res);
        let items = json.artists.items;
        for (let i = 0; i < items.length; i++) {
          this.searchArray.push(items[i])
        }
        this.searchArtistAnswer = true;
        console.log(this.searchArray);
      })
    }
    else if (search_type == "album") {
      this.login.getSearch(search_term, search_type).subscribe((res) => {
        console.log(res);
        let json = JSON.parse(res);
        let items = json.albums.items;
        for (let i = 0; i < items.length; i++) {
          this.searchArray.push(items[i])
        }
        this.searchAlbumAnswer = true;
      })
      console.log(this.searchArray);
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
