import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedTracksComponent } from './most-played-tracks.component';

describe('MostPlayedTracksComponent', () => {
  let component: MostPlayedTracksComponent;
  let fixture: ComponentFixture<MostPlayedTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPlayedTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPlayedTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
