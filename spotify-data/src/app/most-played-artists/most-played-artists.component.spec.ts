import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedArtistsComponent } from './most-played-artists.component';

describe('MostPlayedArtistsComponent', () => {
  let component: MostPlayedArtistsComponent;
  let fixture: ComponentFixture<MostPlayedArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPlayedArtistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPlayedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
