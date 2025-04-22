import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedAlbumsComponent } from './most-played-albums.component';

describe('MostPlayedAlbumsComponent', () => {
  let component: MostPlayedAlbumsComponent;
  let fixture: ComponentFixture<MostPlayedAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPlayedAlbumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPlayedAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
