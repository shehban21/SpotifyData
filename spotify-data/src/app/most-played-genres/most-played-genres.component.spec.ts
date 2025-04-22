import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedGenresComponent } from './most-played-genres.component';

describe('MostPlayedGenresComponent', () => {
  let component: MostPlayedGenresComponent;
  let fixture: ComponentFixture<MostPlayedGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPlayedGenresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostPlayedGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
