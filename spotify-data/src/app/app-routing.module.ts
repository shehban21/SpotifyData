import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostPlayedAlbumsComponent } from './most-played-albums/most-played-albums.component';
import { MostPlayedArtistsComponent } from './most-played-artists/most-played-artists.component';
import { MostPlayedGenresComponent } from './most-played-genres/most-played-genres.component';
import { MostPlayedTracksComponent } from './most-played-tracks/most-played-tracks.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SearchSpotifyComponent } from './search-spotify/search-spotify.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'recent', component: TableComponent },
  { path: 'mostplayedtracks', component: MostPlayedTracksComponent},
  { path: 'mostplayedalbums', component: MostPlayedAlbumsComponent},
  { path: 'mostplayedartists', component: MostPlayedArtistsComponent},
  { path: 'mostplayedgenres', component: MostPlayedGenresComponent},
  { path: 'search', component: SearchSpotifyComponent},
  { path: 'recommendations', component: RecommendationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
