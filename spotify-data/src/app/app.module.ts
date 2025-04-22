import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './table/table.component';
import { MostPlayedTracksComponent } from './most-played-tracks/most-played-tracks.component';
import { MostPlayedAlbumsComponent } from './most-played-albums/most-played-albums.component';
import { MostPlayedArtistsComponent } from './most-played-artists/most-played-artists.component';
import { MostPlayedGenresComponent } from './most-played-genres/most-played-genres.component';
import { SearchSpotifyComponent } from './search-spotify/search-spotify.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { LoginServiceService } from './Services/login-service.service';
import { DataService } from './Services/data.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        TableComponent,
        MostPlayedTracksComponent,
        MostPlayedAlbumsComponent,
        MostPlayedArtistsComponent,
        MostPlayedGenresComponent,
        SearchSpotifyComponent,
        RecommendationsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule, MatDialogModule, 
        NgMultiSelectDropDownModule.forRoot()], providers: [LoginServiceService, DataService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
