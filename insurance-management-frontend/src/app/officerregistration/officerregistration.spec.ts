import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officerregistration } from './officerregistration';

describe('Officerregistration', () => {
  let component: Officerregistration;
  let fixture: ComponentFixture<Officerregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Officerregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Officerregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
