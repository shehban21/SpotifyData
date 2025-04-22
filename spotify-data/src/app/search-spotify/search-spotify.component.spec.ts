import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpotifyComponent } from './search-spotify.component';

describe('SearchSpotifyComponent', () => {
  let component: SearchSpotifyComponent;
  let fixture: ComponentFixture<SearchSpotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSpotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
