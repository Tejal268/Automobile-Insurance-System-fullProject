import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officerlogin } from './officerlogin';

describe('Officerlogin', () => {
  let component: Officerlogin;
  let fixture: ComponentFixture<Officerlogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Officerlogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Officerlogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
