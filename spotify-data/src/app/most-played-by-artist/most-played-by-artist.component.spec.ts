import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedByArtistComponent } from './most-played-by-artist.component';

describe('MostPlayedByArtistComponent', () => {
  let component: MostPlayedByArtistComponent;
  let fixture: ComponentFixture<MostPlayedByArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostPlayedByArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostPlayedByArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
