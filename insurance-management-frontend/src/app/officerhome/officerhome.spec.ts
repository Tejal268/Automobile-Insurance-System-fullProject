import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officerhome } from './officerhome';

describe('Officerhome', () => {
  let component: Officerhome;
  let fixture: ComponentFixture<Officerhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Officerhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Officerhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
